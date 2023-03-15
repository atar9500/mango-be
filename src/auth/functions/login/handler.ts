import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';
import {parseIdToken} from '~/shared/utils/headerParsers';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type LoginLambda = APIGatewayHandler<typeof Schema>;

const login: LoginLambda = async event => {
  const {AuthenticationResult, ...response} = await cognito
    .adminInitiateAuth({
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: event.body.email,
        PASSWORD: event.body.password,
      },
    })
    .promise();

  if (AuthenticationResult) {
    const user = parseIdToken(AuthenticationResult.IdToken);
    return formatJSONResponse(user, {
      headers: {
        'Access-Token': AuthenticationResult.AccessToken,
        'Refresh-Token': AuthenticationResult.RefreshToken,
        'Id-Token': AuthenticationResult.IdToken,
      },
    });
  }

  return formatJSONResponse(response);
};

export const main = middyfyLambda(login);

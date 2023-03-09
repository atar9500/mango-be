import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import decodeIdToken from '~/shared/utils/decodeIdToken';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type LoginUserLambda = APIGatewayHandler<typeof Schema>;

const loginUser: LoginUserLambda = async event => {
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
    const user = decodeIdToken(AuthenticationResult.IdToken);
    return formatJSONResponse(user, {
      headers: {
        'Access-Token': AuthenticationResult.AccessToken,
        'Refresh-Token': AuthenticationResult.RefreshToken,
      },
    });
  }

  return formatJSONResponse(response);
};

export const main = middyfy(loginUser);

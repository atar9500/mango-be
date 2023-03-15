import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type RefreshLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const refresh: RefreshLambda = async ({refreshToken}) => {
  const {AuthenticationResult, ...response} = await cognito
    .initiateAuth({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: process.env.USER_POOL_CLIENT_ID,
      AuthParameters: {REFRESH_TOKEN: refreshToken},
    })
    .promise();

  if (AuthenticationResult) {
    return formatJSONResponse(
      {},
      {
        headers: {
          'Access-Token': AuthenticationResult.AccessToken,
          'Id-Token': AuthenticationResult.IdToken,
        },
      },
    );
  }

  return formatJSONResponse(response);
};

export const main = middyfyLambda(refresh, {authorized: true});

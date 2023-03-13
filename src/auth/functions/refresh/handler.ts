import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import extractBearerToken from '~/shared/utils/extractBearerToken';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type RefreshLambda = APIGatewayHandler<typeof Schema>;

const refresh: RefreshLambda = async event => {
  const {AuthenticationResult, ...response} = await cognito
    .initiateAuth({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: process.env.USER_POOL_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: extractBearerToken(event.headers['Refresh-Token']),
      },
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

export const main = middyfy(refresh);

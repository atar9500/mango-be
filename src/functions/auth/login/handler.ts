import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {ValidatedEventAPIGatewayProxyEvent} from '~/shared/libs/api-gateway';
import {formatJSONResponse} from '~/shared/libs/api-gateway';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type LoginUserLambda = ValidatedEventAPIGatewayProxyEvent<typeof Schema>;

const loginUser: LoginUserLambda = async event => {
  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: event.body.email,
      PASSWORD: event.body.password,
    },
  };
  const response = await cognito.adminInitiateAuth(params).promise();

  return formatJSONResponse({token: response.AuthenticationResult.IdToken});
};

export const main = middyfy(loginUser);

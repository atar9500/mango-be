import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {ValidatedEventAPIGatewayProxyEvent} from '~/shared/libs/api-gateway';
import {formatJSONResponse} from '~/shared/libs/api-gateway';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type LoginUserLambda = ValidatedEventAPIGatewayProxyEvent<typeof Schema>;

const loginUser: LoginUserLambda = async event => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: event.body.email,
    UserAttributes: [
      {
        Name: 'email',
        Value: event.body.email,
      },
      {
        Name: 'name',
        Value: event.body.name,
      },
    ],
    MessageAction: 'SUPPRESS',
  };

  const {User} = await cognito.adminCreateUser(params).promise();

  if (User) {
    const passwordParams = {
      Password: event.body.password,
      UserPoolId: process.env.USER_POOL_ID,
      Username: event.body.email,
      Permanent: true,
    };
    await cognito.adminSetUserPassword(passwordParams).promise();
  }

  return formatJSONResponse();
};

export const main = middyfy(loginUser);

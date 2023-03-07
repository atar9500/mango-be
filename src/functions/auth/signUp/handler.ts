import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {ValidatedEventAPIGatewayProxyEvent} from '~/shared/libs/api-gateway';
import {formatJSONResponse} from '~/shared/libs/api-gateway';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type SignUpUserLambda = ValidatedEventAPIGatewayProxyEvent<typeof Schema>;

const signUpUser: SignUpUserLambda = async event => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: event.body.email,
    UserAttributes: [
      {
        Name: 'email',
        Value: event.body.email,
      },
      {
        Name: 'phone_number',
        Value: event.body.phone_number,
      },
      {
        Name: 'name',
        Value: event.body.name,
      },
    ],
  };

  try {
    const {User} = await cognito.adminCreateUser(params).promise();
    if (!User) {
      return formatJSONResponse({message: 'Failed to create a user!'}, 400);
    }
    return formatJSONResponse(User.Attributes);
  } catch (error) {
    return formatJSONResponse({message: error}, 400);
  }
};

export const main = middyfy(signUpUser);

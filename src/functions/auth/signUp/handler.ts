import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type SignUpUserLambda = APIGatewayHandler<typeof Schema>;

const signUpUser: SignUpUserLambda = async event => {
  const {email, phoneNumber, name} = event.body;

  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: email,
    UserAttributes: [
      {Name: 'email', Value: email},
      {Name: 'phone_number', Value: phoneNumber},
      {Name: 'name', Value: name},
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

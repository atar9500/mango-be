import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type SignUpUserLambda = APIGatewayHandler<typeof Schema>;

const signUpUser: SignUpUserLambda = async event => {
  await cognito
    .adminCreateUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: event.body.email,
      UserAttributes: [
        {Name: 'email', Value: event.body.email},
        {Name: 'name', Value: event.body.name},
      ],
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfy(signUpUser);

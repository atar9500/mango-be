import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type SignUpUserLambda = APIGatewayHandler<typeof Schema>;

const signUpUser: SignUpUserLambda = async ({body}) => {
  await cognito
    .adminCreateUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: body.email,
      UserAttributes: [
        {Name: 'email', Value: body.email},
        {Name: 'name', Value: body.name},
      ],
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(signUpUser);

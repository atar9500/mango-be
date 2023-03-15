import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type ForgotPasswordLambda = APIGatewayHandler<typeof Schema>;

const forgotPassword: ForgotPasswordLambda = async event => {
  await cognito
    .forgotPassword({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      Username: event.body.email,
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(forgotPassword);

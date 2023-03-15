import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type ConfirmForgotPasswordLambda = APIGatewayHandler<typeof Schema>;

const confirmForgotPassword: ConfirmForgotPasswordLambda = async event => {
  await cognito
    .confirmForgotPassword({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      Username: event.body.email,
      ConfirmationCode: event.body.code,
      Password: event.body.password,
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(confirmForgotPassword);

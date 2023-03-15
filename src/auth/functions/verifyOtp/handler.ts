import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type VerifyOtpLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const verifyOtp: VerifyOtpLambda = async ({accessToken, body}) => {
  await cognito
    .verifyUserAttribute({
      AccessToken: accessToken,
      AttributeName: 'phone_number',
      Code: body.code,
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(verifyOtp, {authorized: true});

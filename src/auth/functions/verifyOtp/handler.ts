import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import extractBearerToken from '~/shared/utils/extractBearerToken';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type VerifyOtpLambda = APIGatewayHandler<typeof Schema>;

const verifyOtp: VerifyOtpLambda = async event => {
  const accessToken = extractBearerToken(event.headers.Authorization);

  await cognito
    .verifyUserAttribute({
      AccessToken: accessToken,
      AttributeName: 'phone_number',
      Code: event.body.code,
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfy(verifyOtp);

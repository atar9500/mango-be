import {SNS, CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import extractBearerToken from '~/shared/utils/extractBearerToken';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();
const sns = new SNS();

type SendOtpLambda = APIGatewayHandler<typeof Schema>;

const isNumberOptedOut = async (phoneNumber: string) => {
  const response = await sns
    .checkIfPhoneNumberIsOptedOut({phoneNumber})
    .promise();
  return response.isOptedOut;
};

const generateOtp = async (accessToken: string) => {
  try {
    return await cognito
      .getUserAttributeVerificationCode({
        AccessToken: accessToken,
        AttributeName: 'phone_number',
      })
      .promise();
  } catch (e) {
    console.error(e);
  }
};

const sendOtp: SendOtpLambda = async event => {
  const optedOut = await isNumberOptedOut(event.body.phoneNumber);
  if (optedOut) {
    return formatJSONResponse({}, {statusCode: 400});
  }

  const accessToken = extractBearerToken(event.headers['Access-Token']);
  await generateOtp(accessToken);

  return formatJSONResponse({});
};

export const main = middyfy(sendOtp);

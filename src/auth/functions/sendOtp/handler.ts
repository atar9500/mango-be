import {SNS, CognitoIdentityServiceProvider} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();
const sns = new SNS();

type SendOtpLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const isNumberOptedOut = async (phoneNumber: string) => {
  const response = await sns
    .checkIfPhoneNumberIsOptedOut({phoneNumber})
    .promise();
  return response.isOptedOut;
};

const generateOtp = async (accessToken: string, phoneNumber: string) => {
  try {
    return await cognito
      .updateUserAttributes({
        AccessToken: accessToken,
        UserAttributes: [{Name: 'phone_number', Value: phoneNumber}],
      })
      .promise();
  } catch (e) {
    console.error(e);
  }
};

const sendOtp: SendOtpLambda = async ({body, accessToken}) => {
  const optedOut = await isNumberOptedOut(body.phoneNumber);
  if (optedOut) {
    return formatJSONResponse({}, {statusCode: 400});
  }

  await generateOtp(accessToken, body.phoneNumber);

  return formatJSONResponse({});
};

export const main = middyfyLambda(sendOtp, {authorized: true});

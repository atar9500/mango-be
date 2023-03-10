import {DynamoDB, CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import sha256 from '~/shared/utils/sha256';
import extractBearerToken from '~/shared/utils/extractBearerToken';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const cognito = new CognitoIdentityServiceProvider();

type VerifyOtpLambda = APIGatewayHandler<typeof Schema>;

const markAsVerified = async (accessToken: string, phoneNumber: string) => {
  await cognito
    .updateUserAttributes({
      AccessToken: accessToken,
      UserAttributes: [
        {
          Name: 'phone_number_verified',
          Value: 'true',
        },
        {
          Name: 'phoneNumber',
          Value: phoneNumber,
        },
      ],
    })
    .promise();
};

const checkOtp = async (...data: string[]) => {
  const hash = sha256(...data);
  const params = {
    TableName: process.env.OTP_TABLE,
    Key: {hash},
  };

  const {Item} = await db.get(params).promise();

  const verfied = Item.hash === hash;
  if (verfied) {
    await db.delete(params).promise();
  }

  return verfied;
};

const verifyOtp: VerifyOtpLambda = async event => {
  const {phoneNumber, otp} = event.body;
  const {Authorization} = event.headers;
  const token = extractBearerToken(Authorization);

  const verified = await checkOtp(phoneNumber, otp, token);
  if (!verified) {
    return formatJSONResponse({}, {statusCode: 400});
  }

  await markAsVerified(token, phoneNumber);

  return formatJSONResponse({});
};

export const main = middyfy(verifyOtp);

import {DynamoDB, CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import sha256 from '~/shared/utils/sha256';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const cognito = new CognitoIdentityServiceProvider();

type VerifyOtpLambda = APIGatewayHandler<typeof Schema>;

const markAsVerified = async (email: string) => {
  await cognito
    .adminUpdateUserAttributes({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: 'phone_number_verified',
          Value: 'true',
        },
      ],
    })
    .promise();
};

const checkOtp = async (email: string, phoneNumber: string, otp: string) => {
  const hash = sha256(email, phoneNumber, otp);
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
  const {phoneNumber, email, otp} = event.body;

  const verified = await checkOtp(email, phoneNumber, otp);
  if (!verified) {
    return formatJSONResponse({}, {statusCode: 400});
  }

  await markAsVerified(email);

  return formatJSONResponse({});
};

export const main = middyfy(verifyOtp);

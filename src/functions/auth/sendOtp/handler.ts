import * as crypto from 'crypto';

import {DynamoDB, SNS} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import sha256 from '~/shared/utils/sha256';
import extractBearerToken from '~/shared/utils/extractBearerToken';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const sns = new SNS();

type SendOtpLambda = APIGatewayHandler<typeof Schema>;

const isNumberOptedOut = async (phoneNumber: string) => {
  const response = await sns
    .checkIfPhoneNumberIsOptedOut({phoneNumber})
    .promise();
  return response.isOptedOut;
};

const generateOtp = () => {
  const num = crypto.randomInt(0, 999999).toString();
  if (num.length === 6) {
    return num;
  }
  const padding = new Array(6 - num.length).fill('0').join();
  return `${padding}${num}`;
};

const logOtp = async (...data: string[]) => {
  const ttl = Math.floor(Date.now() / 1000) + 120;
  const hash = sha256(...data);
  await db.put({TableName: process.env.OTP_TABLE, Item: {hash, ttl}}).promise();
};

const smsOtp = async (phoneNumber: string, otp: string) => {
  await sns
    .publish({
      Message: `Welcome to Mango! Your code is ${otp}`,
      PhoneNumber: phoneNumber,
    })
    .promise();
};

const sendOtp: SendOtpLambda = async event => {
  const {phoneNumber} = event.body;
  const {Authorization} = event.headers;
  const token = extractBearerToken(Authorization);

  const optedOut = await isNumberOptedOut(phoneNumber);
  if (optedOut) {
    return formatJSONResponse({}, {statusCode: 400});
  }

  const otp = generateOtp();
  await logOtp(phoneNumber, otp, token);
  await smsOtp(phoneNumber, otp);

  return formatJSONResponse({});
};

export const main = middyfy(sendOtp);

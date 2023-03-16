import {CognitoIdentityServiceProvider, DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';
import {parseAttributesList} from '~/shared/utils/parseAttributes';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();
const db = new DynamoDB.DocumentClient();

type SignUpLambda = APIGatewayHandler<typeof Schema>;

const signUp: SignUpLambda = async ({body}) => {
  const {email, ...details} = body;
  const {User} = await cognito
    .adminCreateUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      UserAttributes: [{Name: 'email', Value: email}],
    })
    .promise();

  const {sub} = parseAttributesList(User.Attributes);
  await db
    .put({TableName: process.env.USERS_TABLE, Item: {id: sub, ...details}})
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(signUp);

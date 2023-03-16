import {DynamoDB} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';
import getTableUpdateParams from '~/shared/utils/getTableUpdateParams';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();

type UpdateUserLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const updateUser: UpdateUserLambda = async ({body, user}) => {
  const {ExpressionAttributeValues, ...updateParams} =
    getTableUpdateParams(body);

  await db
    .update({
      TableName: process.env.USERS_TABLE,
      Key: {id: user.id},
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': user.id,
        ...ExpressionAttributeValues,
      },
      ...updateParams,
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(updateUser, {authorized: true});

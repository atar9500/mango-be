import type {ValidatedEventAPIGatewayProxyEvent} from '~/shared/libs/api-gateway';
import {formatJSONResponse} from '~/shared/libs/api-gateway';
import {middyfy} from '~/shared/libs/lambda';
import {DynamoDB} from 'aws-sdk';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();

type DeleteLambda = ValidatedEventAPIGatewayProxyEvent<typeof Schema>;

const deleteNote: DeleteLambda = async (event) => {
  await db
    .delete({
      TableName: process.env.NOTES_TABLE,
      Key: event.body,
    })
    .promise();

  return formatJSONResponse(event.body);
};

export const main = middyfy(deleteNote);

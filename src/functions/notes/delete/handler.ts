import {DynamoDB} from 'aws-sdk';

import type {ValidatedEventAPIGatewayProxyEvent} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();

type DeleteLambda = ValidatedEventAPIGatewayProxyEvent<typeof Schema>;

const deleteNote: DeleteLambda = async event => {
  await db
    .delete({
      TableName: process.env.NOTES_TABLE,
      Key: event.body,
    })
    .promise();

  return formatJSONResponse(event.body);
};

export const main = middyfy(deleteNote);

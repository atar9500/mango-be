import {DynamoDB} from 'aws-sdk';

import type {ValidatedEventAPIGatewayProxyEvent} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';

const db = new DynamoDB.DocumentClient();

type GetNotesLambda = ValidatedEventAPIGatewayProxyEvent;

const getNotes: GetNotesLambda = async () => {
  const results = await db
    .query({
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: 'authorId = :authorId',
      ExpressionAttributeValues: {
        ':authorId': '1234',
      },
    })
    .promise();

  return formatJSONResponse(results.Items);
};

export const main = middyfy(getNotes);

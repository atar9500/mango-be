import {DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import decodeIdToken from '~/shared/utils/decodeIdToken';

const db = new DynamoDB.DocumentClient();

type GetNotesParams = {
  title?: string;
  content?: string;
  archived?: string;
};

type GetNotesLambda = APIGatewayHandler<unknown, GetNotesParams>;

const getFilterExpression = (params?: Record<string, string>) => {
  const filterExpression = Object.keys(params || {}).reduce<string>(
    (memo, key) => {
      const exp = `contains (${key}, :${key})`;
      if (memo) {
        return `${memo} AND ${exp}`;
      }
      return exp;
    },
    '',
  );
  return filterExpression || undefined;
};

const getNotes: GetNotesLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);
  const params = event.queryStringParameters;

  const results = await db
    .query({
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: 'author = :author',
      FilterExpression: getFilterExpression(params),
      ProjectionExpression:
        'id, title, content, color, archived, createdAt, modifiedAt',
      ExpressionAttributeValues: {
        ':author': user.id,
        ':title': params?.title,
        ':content': params?.content,
        ':archived': params?.archived,
      },
    })
    .promise();

  return formatJSONResponse(results.Items);
};

export const main = middyfy(getNotes);

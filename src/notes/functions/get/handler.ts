import {DynamoDB} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

const db = new DynamoDB.DocumentClient();

type GetNotesParams = {
  title?: string;
  content?: string;
  archived?: string;
};

type GetNotesLambda = AuthorizedAPIGatewayHandler<unknown, GetNotesParams>;

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

const getNotes: GetNotesLambda = async ({queryStringParameters, user}) => {
  const results = await db
    .query({
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: 'author = :author',
      FilterExpression: getFilterExpression(queryStringParameters),
      ProjectionExpression:
        'id, title, content, color, archived, createdAt, modifiedAt',
      ExpressionAttributeValues: {
        ':author': user.id,
        ':title': queryStringParameters?.title,
        ':content': queryStringParameters?.content,
        ':archived': queryStringParameters?.archived,
      },
    })
    .promise();

  return formatJSONResponse(results.Items);
};

export const main = middyfyLambda(getNotes, {authorized: true});

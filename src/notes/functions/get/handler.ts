import {DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import decodeIdToken from '~/shared/utils/decodeIdToken';

const db = new DynamoDB.DocumentClient();

type GetNotesLambda = APIGatewayHandler;

const getNotes: GetNotesLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  const results = await db
    .query({
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: 'author = :author',
      ExpressionAttributeValues: {
        ':author': user.id,
      },
    })
    .promise();

  return formatJSONResponse(results.Items);
};

export const main = middyfy(getNotes);

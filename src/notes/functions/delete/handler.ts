import {DynamoDB, S3} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import decodeIdToken from '~/shared/utils/decodeIdToken';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

type DeleteLambda = APIGatewayHandler<typeof Schema>;

const deleteNote: DeleteLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  await db
    .delete({
      TableName: process.env.NOTES_TABLE,
      Key: {id: event.body.id, author: user.id},
      ConditionExpression: 'id = :id AND author = :author',
      ExpressionAttributeValues: {
        ':id': event.body.id,
        ':author': user.id,
      },
    })
    .promise();

  await s3
    .deleteObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${user.id}/${event.body.id}.html`,
    })
    .promise();

  return formatJSONResponse(event.body);
};

export const main = middyfy(deleteNote);

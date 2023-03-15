import {DynamoDB, S3} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

type DeleteLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const deleteNote: DeleteLambda = async ({body, user}) => {
  await db
    .delete({
      TableName: process.env.NOTES_TABLE,
      Key: {id: body.id, author: user.id},
      ConditionExpression: 'id = :id AND author = :author',
      ExpressionAttributeValues: {
        ':id': body.id,
        ':author': user.id,
      },
    })
    .promise();

  await s3
    .deleteObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${user.id}/${body.id}.html`,
    })
    .promise();

  return formatJSONResponse(body);
};

export const main = middyfyLambda(deleteNote, {authorized: true});

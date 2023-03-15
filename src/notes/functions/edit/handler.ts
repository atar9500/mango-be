import {DynamoDB, S3} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';
import getTableUpdateParams from '~/shared/utils/getTableUpdateParams';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

type EditNoteLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const editNote: EditNoteLambda = async ({body, user}) => {
  const currentTime = Date.now();
  const {id, ...rest} = body;
  const note = {modifiedAt: currentTime, ...rest};

  const {ExpressionAttributeValues, ...updateParams} =
    getTableUpdateParams(note);

  await db
    .update({
      TableName: process.env.NOTES_TABLE,
      Key: {id, author: user.id},
      ConditionExpression: 'id = :id AND author = :author',
      ExpressionAttributeValues: {
        ':id': id,
        ':author': user.id,
        ...ExpressionAttributeValues,
      },
      ...updateParams,
    })
    .promise();

  if (body.content) {
    await s3
      .putObject({
        Bucket: process.env.NOTES_BUCKET,
        Key: `${user.id}/${id}.html`,
        Body: body.content,
        ContentType: 'text/html',
        Metadata: {type: 'html', author: user.id, id},
      })
      .promise();
  }

  return formatJSONResponse({...note, id});
};

export const main = middyfyLambda(editNote);

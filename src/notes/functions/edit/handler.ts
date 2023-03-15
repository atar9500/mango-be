import {DynamoDB, S3} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import getTableUpdateParams from '~/shared/utils/getTableUpdateParams';
import decodeIdToken from '~/shared/utils/decodeIdToken';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

type EditNoteLambda = APIGatewayHandler<typeof Schema>;

const editNote: EditNoteLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  const currentTime = Date.now();
  const {id, ...rest} = event.body;
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

  if (event.body.content) {
    await s3
      .putObject({
        Bucket: process.env.NOTES_BUCKET,
        Key: `${user.id}/${id}.html`,
        Body: event.body.content,
        ContentType: 'text/html',
        Metadata: {type: 'html', author: user.id, id},
      })
      .promise();
  }

  return formatJSONResponse({...note, id});
};

export const main = middyfy(editNote);

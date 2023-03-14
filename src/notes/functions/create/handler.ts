import {randomUUID} from 'crypto';

import {DynamoDB, S3} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import decodeIdToken from '~/shared/utils/decodeIdToken';
import {middyfy} from '~/shared/libs/lambda';

import generateNoteSnippet from '../../utils/generateNoteSnippet';
import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

type CreationLambda = APIGatewayHandler<typeof Schema>;

const createNote: CreationLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  const currentTime = Date.now();
  const note = {
    id: randomUUID(),
    snippet: generateNoteSnippet(event.body.content),
    createdAt: currentTime,
    modifiedAt: currentTime,
    archived: false,
    ...event.body,
  };

  await s3
    .putObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${user.id}/${note.id}.html`,
      Body: event.body.content,
      ContentType: 'text/html',
      Metadata: {type: 'html', author: user.id, id: note.id},
    })
    .promise();

  await db
    .put({TableName: process.env.NOTES_TABLE, Item: {author: user.id, ...note}})
    .promise();

  return formatJSONResponse(note);
};

export const main = middyfy(createNote);

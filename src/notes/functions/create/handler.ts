import {randomUUID} from 'crypto';

import {DynamoDB, S3} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import generateNoteSnippet from '../../utils/generateNoteSnippet';
import Schema from './schema';

const db = new DynamoDB.DocumentClient();
const s3 = new S3();

type CreatNoteLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const createNote: CreatNoteLambda = async ({body, user}) => {
  const currentTime = Date.now();
  const note = {
    id: randomUUID(),
    snippet: generateNoteSnippet(body.content),
    createdAt: currentTime,
    modifiedAt: currentTime,
    archived: false,
    ...body,
  };

  await s3
    .putObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${user.id}/${note.id}.html`,
      Body: body.content,
      ContentType: 'text/html',
      Metadata: {type: 'html', author: user.id, id: note.id},
    })
    .promise();

  await db
    .put({TableName: process.env.NOTES_TABLE, Item: {author: user.id, ...note}})
    .promise();

  return formatJSONResponse(note);
};

export const main = middyfyLambda(createNote, {authorized: true});

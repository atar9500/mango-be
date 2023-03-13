import {randomUUID} from 'crypto';

import {DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import decodeIdToken from '~/shared/utils/decodeIdToken';
import {middyfy} from '~/shared/libs/lambda';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();

type CreationLambda = APIGatewayHandler<typeof Schema>;

const createNote: CreationLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  const currentTime = Date.now();
  const note = {
    id: randomUUID(),
    createdAt: currentTime,
    modifiedAt: currentTime,
    archived: false,
    ...event.body,
  };

  await db
    .put({TableName: process.env.NOTES_TABLE, Item: {author: user.id, ...note}})
    .promise();

  return formatJSONResponse(note);
};

export const main = middyfy(createNote);

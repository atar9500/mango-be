import {DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import getUpdateParams from '~/shared/utils/getUpdateParams';
import decodeIdToken from '~/shared/utils/decodeIdToken';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();

type EditNoteLambda = APIGatewayHandler<typeof Schema>;

const editNote: EditNoteLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  const currentTime = Date.now();
  const {id, ...rest} = event.body;
  const note = {modifiedAt: currentTime, ...rest};

  await db
    .update({
      TableName: process.env.NOTES_TABLE,
      Key: {id, author: user.id},
      ...getUpdateParams(note),
    })
    .promise();

  return formatJSONResponse({...note, id});
};

export const main = middyfy(editNote);

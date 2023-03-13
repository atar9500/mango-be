import {DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import decodeIdToken from '~/shared/utils/decodeIdToken';

import Schema from './schema';

const db = new DynamoDB.DocumentClient();

type DeleteLambda = APIGatewayHandler<typeof Schema>;

const deleteNote: DeleteLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);

  await db
    .delete({
      TableName: process.env.NOTES_TABLE,
      Key: {id: event.body.id, author: user.id},
    })
    .promise();

  return formatJSONResponse(event.body);
};

export const main = middyfy(deleteNote);

import {S3} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import decodeIdToken from '~/shared/utils/decodeIdToken';

const s3 = new S3();

type GetNoteContentParams = {
  id?: string;
};

type GetNoteContentLambda = APIGatewayHandler<unknown, GetNoteContentParams>;

const getNoteContent: GetNoteContentLambda = async event => {
  const user = decodeIdToken(event.headers.Authorization);
  const params = event.queryStringParameters;

  const result = await s3
    .getObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${user.id}/${params.id}.html`,
    })
    .promise();

  return formatJSONResponse({content: result.Body.toString()});
};

export const main = middyfy(getNoteContent);

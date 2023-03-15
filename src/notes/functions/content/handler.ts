import {S3} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

const s3 = new S3();

type GetNoteContentParams = {
  id?: string;
};

type GetNoteContentLambda = AuthorizedAPIGatewayHandler<
  unknown,
  GetNoteContentParams
>;

const getNoteContent: GetNoteContentLambda = async ({
  user,
  queryStringParameters,
}) => {
  const result = await s3
    .getObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${user.id}/${queryStringParameters.id}.html`,
    })
    .promise();

  return formatJSONResponse({content: result.Body.toString()});
};

export const main = middyfyLambda(getNoteContent, {authorized: true});

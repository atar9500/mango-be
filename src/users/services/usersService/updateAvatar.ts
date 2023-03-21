import {S3, DynamoDB} from 'aws-sdk';
import {APIGatewayProxyEvent} from 'aws-lambda';
import * as MultipartParser from 'aws-multipart-parser';
import {FileData} from 'aws-multipart-parser/dist/models';

import getDBUpdateParams from '~/shared/utils/getDBUpdateParams';

const UPPORTED_MIME_TYPES = ['image/jpeg', 'image/png'];

export type UpdateAvatarArgs = {
  id: string;
  event: APIGatewayProxyEvent;
};

const uploadAvatar = async (
  s3: S3,
  id: string,
  {contentType, filename, content}: FileData,
) => {
  if (!UPPORTED_MIME_TYPES.includes(contentType)) {
    throw Error('File extension is not supported!');
  }
  const filePath = `${id}/avatar/${filename}`;

  await s3
    .putObject({
      Bucket: process.env.USERS_BUCKET,
      ACL: 'public-read',
      Body: Buffer.from(content as string, 'binary'),
      Key: filePath,
      ContentType: contentType,
      Metadata: {id, contentType},
    })
    .promise();

  return `https://${process.env.USERS_BUCKET}.s3.amazonaws.com/${filePath}`;
};

const deleteAvatar = async (s3: S3, id: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.USERS_BUCKET,
      Key: `${id}/avatar.*`,
    })
    .promise();
};

const updateAvatar = async (
  s3: S3,
  db: DynamoDB.DocumentClient,
  {id, event}: UpdateAvatarArgs,
): Promise<string> => {
  const {file} = MultipartParser.parse(event, false);

  let url = '';
  if (typeof file !== 'string') {
    url = await uploadAvatar(s3, id, file);
  } else {
    await deleteAvatar(s3, id);
  }

  const params = getDBUpdateParams({avatar: url}, {id});
  await db.update({TableName: process.env.USERS_TABLE, ...params}).promise();

  return url;
};

export default updateAvatar;

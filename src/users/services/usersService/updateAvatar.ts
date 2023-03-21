import {S3, DynamoDB} from 'aws-sdk';

import getDBUpdateParams from '~/shared/utils/getDBUpdateParams';

const EXT_REGEX = /\/(jpg|jpeg|png)$/;

export type UpdateAvatarArgs = {
  id: string;
  type: string;
  file?: string;
};

const uploadAvatar = async (
  s3: S3,
  {id, file, type}: Required<UpdateAvatarArgs>,
) => {
  const ext = EXT_REGEX.exec?.(type)?.[1];
  if (!ext) {
    throw Error('File extension is not supported!');
  }
  const filePath = `${id}/avatar.${ext}`;

  await s3
    .putObject({
      Bucket: process.env.USERS_BUCKET,
      ACL: 'public-read',
      Body: Buffer.from(file, 'base64'),
      Key: filePath,
      ContentType: type,
      Metadata: {id, type},
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
  {id, file, type}: UpdateAvatarArgs,
): Promise<string> => {
  let url = '';
  if (file) {
    url = await uploadAvatar(s3, {id, file, type});
  } else {
    await deleteAvatar(s3, id);
  }

  const params = getDBUpdateParams({avatar: url}, {id});
  await db.update({TableName: process.env.USERS_TABLE, ...params}).promise();

  return url;
};

export default updateAvatar;

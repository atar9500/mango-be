import {S3} from 'aws-sdk';

export type GetNoteContentArgs = {
  id: string;
  author: string;
};

const getNoteContent = async (
  s3: S3,
  {author, id}: GetNoteContentArgs,
): Promise<string> => {
  const result = await s3
    .getObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${author}/${id}.html`,
    })
    .promise();

  return result.Body.toString();
};

export default getNoteContent;

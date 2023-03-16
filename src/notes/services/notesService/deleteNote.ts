import {S3, DynamoDB} from 'aws-sdk';

export type DeleteNoteArgs = {
  author: string;
  id: string;
};

const deleteNote = async (
  s3: S3,
  db: DynamoDB.DocumentClient,
  {author, id}: DeleteNoteArgs,
): Promise<string> => {
  await db
    .delete({
      TableName: process.env.NOTES_TABLE,
      Key: {id, author},
      ConditionExpression: 'id = :id AND author = :author',
      ExpressionAttributeValues: {':id': id, ':author': author},
    })
    .promise();

  await s3
    .deleteObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${author}/${id}.html`,
    })
    .promise();

  return id;
};

export default deleteNote;

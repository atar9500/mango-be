import {DynamoDB} from 'aws-sdk';

import {Note} from '../../types/note';

export type GetNotesArgs = {
  author: string;
  query?: string;
  archived?: string;
};

const getNotes = async (
  db: DynamoDB.DocumentClient,
  {author, query, archived}: GetNotesArgs,
): Promise<Note[]> => {
  const {Items} = await db
    .query({
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: 'author = :author',
      FilterExpression:
        'archived = :archived AND contains(title, :query) OR contains(snippet, :query)',
      ProjectionExpression:
        'id, title, content, color, archived, createdAt, modifiedAt',
      ExpressionAttributeValues: {
        ':author': author,
        ':query': query,
        ':archived': archived,
      },
    })
    .promise();
  return Items as Note[];
};

export default getNotes;

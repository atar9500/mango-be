import {DynamoDB} from 'aws-sdk';

import {Note} from '../../types/note';

export type GetNotesArgs = {
  author: string;
  query?: string;
  archived?: boolean;
};

const getFilterExpression = (archived?: boolean, query?: string) => {
  let filter = '';
  if (typeof archived === 'boolean') {
    filter += `archived = :archived${query ? ' AND ' : ''}`;
  }
  if (query) {
    filter += 'contains(title, :query) OR contains(snippet, :query)';
  }
  return filter || undefined;
};

const getNotes = async (
  db: DynamoDB.DocumentClient,
  data: GetNotesArgs,
): Promise<Note[]> => {
  const {Items} = await db
    .query({
      TableName: process.env.NOTES_TABLE,
      KeyConditionExpression: 'author = :author',
      FilterExpression: getFilterExpression(data.archived, data.query),
      ProjectionExpression:
        'id, title, snippet, color, archived, createdAt, modifiedAt',
      ExpressionAttributeValues: Object.keys(data).reduce((memo, key) => {
        memo[`:${key}`] = data[key];
        return memo;
      }, {}),
    })
    .promise();
  return Items as Note[];
};

export default getNotes;

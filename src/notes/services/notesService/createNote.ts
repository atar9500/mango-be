import {randomUUID} from 'crypto';

import {S3, DynamoDB} from 'aws-sdk';

import {updateContent} from './editNote';
import {Note} from '../../types/note';

export type CreateNoteArgs = {
  author: string;
  title: string;
  content?: string;
  color: string;
};

const createNote = async (
  s3: S3,
  db: DynamoDB.DocumentClient,
  {author, content, ...rest}: CreateNoteArgs,
): Promise<Note> => {
  const currentTime = Date.now();
  const note = {
    id: randomUUID(),
    createdAt: currentTime,
    modifiedAt: currentTime,
    archived: false,
    ...rest,
  };

  await db
    .put({
      TableName: process.env.NOTES_TABLE,
      Item: {author, ...note},
    })
    .promise();

  let snippet = '';
  if (content) {
    snippet = await updateContent(s3, db, {author, id: note.id, content});
  }
  return {...note, content, snippet};
};

export default createNote;

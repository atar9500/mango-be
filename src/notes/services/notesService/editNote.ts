import {S3, DynamoDB} from 'aws-sdk';

import getTableUpdateParams from '~/shared/utils/getTableUpdateParams';

import {Note} from '../../types/note';

const BREAK_LINE_REGEX = /<\/ul>|<li>|<br>/gim;
const HTML_TAGS_REGEX = /<.*?>/gim;

const getSnippet = (html?: string) =>
  html
    ?.replace(BREAK_LINE_REGEX, '\n')
    ?.replace(HTML_TAGS_REGEX, '')
    ?.substring?.(0, 200) || '';

type EditContentArgs = {
  author: string;
  id: string;
  content: string;
};

export const updateContent = async (
  s3: S3,
  db: DynamoDB.DocumentClient,
  {author, id, content}: EditContentArgs,
) => {
  await s3
    .putObject({
      Bucket: process.env.NOTES_BUCKET,
      Key: `${author}/${id}.html`,
      Body: content,
      ContentType: 'text/html',
      Metadata: {type: 'html', author, id},
    })
    .promise();

  const snippet = getSnippet(content);
  await editNote(s3, db, {id, author, snippet});
  return snippet;
};

export type EditNoteArgs = {
  author: string;
  id: string;
  title?: string;
  content?: string;
  color?: string;
  archived?: boolean;
  snippet?: string;
};

const editNote = async (
  s3: S3,
  db: DynamoDB.DocumentClient,
  {author, id, content, ...rest}: EditNoteArgs,
): Promise<Partial<Note>> => {
  await db
    .update({
      TableName: process.env.NOTES_TABLE,
      ...getTableUpdateParams({modifiedAt: Date.now(), ...rest}, {id, author}),
    })
    .promise();

  let snippet = '';
  if (content) {
    snippet = await updateContent(s3, db, {author, id, content});
  }
  return {id, content, snippet, ...rest};
};

export default editNote;

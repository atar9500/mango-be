import {S3, DynamoDB} from 'aws-sdk';

import createNote, {CreateNoteArgs} from './createNote';
import deleteNote, {DeleteNoteArgs} from './deleteNote';
import editNote, {EditNoteArgs} from './editNote';
import getNotes, {GetNotesArgs} from './getNotes';
import getNoteContent, {GetNoteContentArgs} from './getNoteContent';
import {Note} from '../../types/note';

const s3 = new S3();
const db = new DynamoDB.DocumentClient();

export type NotesService = {
  createNote: (args: Omit<CreateNoteArgs, 'author'>) => Promise<Note>;
  deleteNote: (args: Omit<DeleteNoteArgs, 'author'>) => Promise<string>;
  editNote: (args: Omit<EditNoteArgs, 'author'>) => Promise<Partial<Note>>;
  getNotes: (args: Omit<GetNotesArgs, 'author'>) => Promise<Note[]>;
  getNoteContent: (args: Omit<GetNoteContentArgs, 'author'>) => Promise<string>;
};

const getNotesService = (author: string): NotesService => ({
  createNote: async args => createNote(s3, db, {author, ...args}),
  deleteNote: async args => deleteNote(s3, db, {author, ...args}),
  editNote: async args => editNote(s3, db, {author, ...args}),
  getNotes: async args => getNotes(db, {author, ...args}),
  getNoteContent: async args => getNoteContent(s3, {author, ...args}),
});

export default getNotesService;

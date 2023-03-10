import {NotesTable, NotesTableIAMRole} from './notesTable';

export * from './notesTable';
export const dynamoDBResources = {NotesTable};
export const dynamoDBIAMRoles = [NotesTableIAMRole];

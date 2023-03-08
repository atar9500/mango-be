import {NotesTable, NotesTableIAMRole} from './notesTable';
import {OtpTable, OtpTableIAMRole} from './otpTable';

export const dynamoDBResources = {NotesTable, OtpTable};

export const dynamoDBIAMRoles = [NotesTableIAMRole, OtpTableIAMRole];

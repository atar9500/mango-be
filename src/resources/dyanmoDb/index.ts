import {NotesTable, NotesTableIAMRole} from './notesTable';
import {OTPTable, OTPTableIAMRole} from './otpTable';

export const dynamoDBResources = {NotesTable, OTPTable};

export const dynamoDBIAMRoles = [NotesTableIAMRole, OTPTableIAMRole];

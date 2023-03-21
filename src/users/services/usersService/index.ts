import {S3, DynamoDB} from 'aws-sdk';

import updateAvatar, {UpdateAvatarArgs} from './updateAvatar';
import updateUser, {UpdateUserArgs} from './updateUser';

const s3 = new S3();
const db = new DynamoDB.DocumentClient();

export type UsersService = {
  updateUser: (args: Omit<UpdateUserArgs, 'id'>) => Promise<void>;
  updateAvatar: (args: Omit<UpdateAvatarArgs, 'id'>) => Promise<string>;
};

const getUsersService = (id: string): UsersService => ({
  updateAvatar: async args => await updateAvatar(s3, db, {id, ...args}),
  updateUser: async args => await updateUser(db, {id, ...args}),
});

export default getUsersService;

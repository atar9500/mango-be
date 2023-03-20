import {DynamoDB} from 'aws-sdk';

import updateUser, {UpdateUserArgs} from './updateUser';

const db = new DynamoDB.DocumentClient();

export type UsersService = {
  updateUser: (args: Omit<UpdateUserArgs, 'id'>) => Promise<void>;
};

const getUsersService = (id: string): UsersService => ({
  updateUser: async args => await updateUser(db, {id, ...args}),
});

export default getUsersService;

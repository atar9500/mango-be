import {DynamoDB} from 'aws-sdk';

import getTableUpdateParams from '~/shared/utils/getTableUpdateParams';

export type UpdateUserArgs = {
  id: string;
  firstName?: string;
  lastName?: string;
};

const updateUser = async (
  db: DynamoDB.DocumentClient,
  {id, ...rest}: UpdateUserArgs,
): Promise<void> => {
  const params = getTableUpdateParams(rest, {id});
  await db.update({TableName: process.env.USERS_TABLE, ...params}).promise();
};

export default updateUser;

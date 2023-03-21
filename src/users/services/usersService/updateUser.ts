import {DynamoDB} from 'aws-sdk';

import getDBUpdateParams from '~/shared/utils/getDBUpdateParams';

export type UpdateUserArgs = {
  id: string;
  firstName?: string;
  lastName?: string;
};

const updateUser = async (
  db: DynamoDB.DocumentClient,
  {id, ...rest}: UpdateUserArgs,
): Promise<void> => {
  const params = getDBUpdateParams(rest, {id});
  await db.update({TableName: process.env.USERS_TABLE, ...params}).promise();
};

export default updateUser;

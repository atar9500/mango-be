import {CognitoIdentityServiceProvider, DynamoDB} from 'aws-sdk';

import {parseAttributesList} from '~/shared/utils/parseAttributes';

export type SignUpArgs = {email: string; firstName: string; lastName: string};

const signUp = async (
  cognito: CognitoIdentityServiceProvider,
  db: DynamoDB.DocumentClient,
  {email, ...rest}: SignUpArgs,
): Promise<void> => {
  const {User} = await cognito
    .adminCreateUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      UserAttributes: [{Name: 'email', Value: email}],
    })
    .promise();
  const {sub} = parseAttributesList(User.Attributes);
  await db
    .put({TableName: process.env.USERS_TABLE, Item: {id: sub, ...rest}})
    .promise();
};

export default signUp;

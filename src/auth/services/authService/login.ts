import {CognitoIdentityServiceProvider, DynamoDB} from 'aws-sdk';

import {User} from '~/shared/types/user';
import {parseIdToken} from '~/shared/utils/headerParsers';

import {AuthResponse} from '../../types/authResponse';
import {UserDetails} from '../../types/user';

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = AuthResponse<User | {challenge: string}>;

const login = async (
  cognito: CognitoIdentityServiceProvider,
  db: DynamoDB.DocumentClient,
  {email, password}: LoginArgs,
): Promise<LoginResponse> => {
  const {
    AuthenticationResult,
    ChallengeName: challenge,
    Session,
  } = await cognito
    .adminInitiateAuth({
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.USER_POOL_CLIENT_ID,
      AuthParameters: {USERNAME: email, PASSWORD: password},
    })
    .promise();
  if (AuthenticationResult) {
    const {id, ...userAuth} = parseIdToken(AuthenticationResult.IdToken);
    const {Item} = await db
      .get({
        TableName: process.env.USERS_TABLE,
        Key: {id},
        ProjectionExpression: 'firstName, lastName, avatar',
      })
      .promise();
    const headers = {
      'Access-Token': AuthenticationResult.AccessToken,
      'Refresh-Token': AuthenticationResult.RefreshToken,
      'Id-Token': AuthenticationResult.IdToken,
    };
    const item = Item as UserDetails;
    return {body: {...item, ...userAuth}, headers};
  }
  return {body: {challenge}, headers: {Session}};
};

export default login;

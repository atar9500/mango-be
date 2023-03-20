import {CognitoIdentityServiceProvider, DynamoDB} from 'aws-sdk';

import {parseIdToken} from '~/shared/utils/headerParsers';

import {AuthResponse} from '../../types/authResponse';
import {User, UserDetails} from '../../types/user';

export type ConfirmSignUpArgs = {
  challenge: string;
  email: string;
  password: string;
  session: string;
};

export type ConfirmSignUpResponse = AuthResponse<User | {challenge: string}>;

const confirmSignUp = async (
  cognito: CognitoIdentityServiceProvider,
  db: DynamoDB.DocumentClient,
  {challenge, email, password, session}: ConfirmSignUpArgs,
): Promise<ConfirmSignUpResponse> => {
  const {AuthenticationResult, ChallengeName, Session} = await cognito
    .respondToAuthChallenge({
      ChallengeName: challenge,
      ClientId: process.env.USER_POOL_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: password,
      },
      Session: session,
    })
    .promise();

  if (AuthenticationResult) {
    await cognito
      .adminUpdateUserAttributes({
        UserPoolId: process.env.USER_POOL_ID,
        Username: email,
        UserAttributes: [{Name: 'email_verified', Value: 'true'}],
      })
      .promise();

    const {id, ...user} = parseIdToken(AuthenticationResult.IdToken);
    const {Item} = await db
      .get({
        TableName: process.env.USERS_TABLE,
        Key: {id},
        ProjectionExpression: 'firstName, lastName',
      })
      .promise();

    return {
      body: {...user, ...(Item as UserDetails)},
      headers: {
        'Access-Token': AuthenticationResult.AccessToken,
        'Refresh-Token': AuthenticationResult.RefreshToken,
        'Id-Token': AuthenticationResult.IdToken,
      },
    };
  }

  return {body: {challenge: ChallengeName}, headers: {Session}};
};

export default confirmSignUp;

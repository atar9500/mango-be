import {CognitoIdentityServiceProvider} from 'aws-sdk';

import {AuthResponse} from '../../types/authResponse';

export type RefreshArgs = {
  refreshToken: string;
};

export type RefreshResponse = AuthResponse;

const refresh = async (
  cognito: CognitoIdentityServiceProvider,
  {refreshToken}: RefreshArgs,
): Promise<RefreshResponse> => {
  const {AuthenticationResult} = await cognito
    .initiateAuth({
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: process.env.USER_POOL_CLIENT_ID,
      AuthParameters: {REFRESH_TOKEN: refreshToken},
    })
    .promise();

  if (AuthenticationResult) {
    return {
      headers: {
        'Access-Token': AuthenticationResult.AccessToken,
        'Id-Token': AuthenticationResult.IdToken,
      },
    };
  }

  throw Error('Could not refresh token!');
};

export default refresh;

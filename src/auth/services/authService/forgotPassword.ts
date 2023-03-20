import {CognitoIdentityServiceProvider} from 'aws-sdk';

export type ForgotPasswordArgs = {
  email: string;
};

const forgotPassword = async (
  cognito: CognitoIdentityServiceProvider,
  {email}: ForgotPasswordArgs,
): Promise<void> => {
  await cognito
    .forgotPassword({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      Username: email,
    })
    .promise();
};

export default forgotPassword;

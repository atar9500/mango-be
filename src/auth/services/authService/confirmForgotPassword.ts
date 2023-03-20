import {CognitoIdentityServiceProvider} from 'aws-sdk';

export type ConfirmForgotPasswordArgs = {
  email: string;
  code: string;
  password: string;
};

const confirmForgotPassword = async (
  cognito: CognitoIdentityServiceProvider,
  {email, code, password}: ConfirmForgotPasswordArgs,
): Promise<void> => {
  await cognito
    .confirmForgotPassword({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: password,
    })
    .promise();
};

export default confirmForgotPassword;

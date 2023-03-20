import {CognitoIdentityServiceProvider} from 'aws-sdk';

export type VerifyOtpArgs = {
  code: string;
  accessToken: string;
};

const verifyOtp = async (
  cognito: CognitoIdentityServiceProvider,
  {accessToken, code}: VerifyOtpArgs,
): Promise<void> => {
  await cognito
    .verifyUserAttribute({
      AccessToken: accessToken,
      AttributeName: 'phone_number',
      Code: code,
    })
    .promise();
};

export default verifyOtp;

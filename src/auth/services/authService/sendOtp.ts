import {SNS, CognitoIdentityServiceProvider} from 'aws-sdk';

export type SendOtpArgs = {
  phoneNumber: string;
  accessToken: string;
};

const sendOtp = async (
  cognito: CognitoIdentityServiceProvider,
  sns: SNS,
  {phoneNumber, accessToken}: SendOtpArgs,
): Promise<void> => {
  const {isOptedOut} = await sns
    .checkIfPhoneNumberIsOptedOut({phoneNumber})
    .promise();
  if (isOptedOut) {
    throw Error('Phone number is opted out!');
  }

  await cognito
    .updateUserAttributes({
      AccessToken: accessToken,
      UserAttributes: [{Name: 'phone_number', Value: phoneNumber}],
    })
    .promise();
};

export default sendOtp;

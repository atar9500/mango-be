const USER_POOL_NAME = '${env:SERVICE}-user_pool';

export const CognitoUserPool = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: USER_POOL_NAME,
    Schema: [
      {
        Name: 'email',
        Required: true,
      },
      {
        Name: 'phone_number',
        Required: true,
        Mutable: true,
      },
      {
        Name: 'name',
        Required: true,
        Mutable: true,
      },
    ],
    Policies: {
      PasswordPolicy: {
        RequireLowercase: true,
        RequireSymbols: true,
        RequireNumbers: true,
        MinimumLength: 8,
        RequireUppercase: true,
      },
    },
    UsernameAttributes: ['email', 'phone_number'],
    AutoVerifiedAttributes: ['email', 'phone_number'],
    SmsConfiguration: {
      SnsCallerArn:
        'arn:aws:sns:${env:REGION}:${aws:accountId}:${env:SERVICE}-sms_auth',
      ExternalId: '${env:SMS_AUTH_EXTERNAL_ID}',
      SnsRegion: '${env:REGION}',
    },
  },
};

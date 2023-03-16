const USER_POOL_NAME = '${env:SERVICE}-user_pool';

export const UserPool = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: USER_POOL_NAME,
    Schema: [
      {
        Name: 'email',
        Required: true,
        Mutable: true,
      },
      {
        Name: 'phone_number',
        Mutable: true,
      },
    ],
    Policies: {
      PasswordPolicy: {
        RequireLowercase: true,
        RequireSymbols: true,
        RequireNumbers: true,
        MinimumLength: 12,
        RequireUppercase: true,
      },
    },
    UsernameAttributes: ['email'],
    AutoVerifiedAttributes: ['email', 'phone_number'],
    MfaConfiguration: 'OFF',
    UserAttributeUpdateSettings: {
      AttributesRequireVerificationBeforeUpdate: ['phone_number'],
    },
    SmsConfiguration: {
      SnsCallerArn: {'Fn::GetAtt': ['SMSAuthRole', 'Arn']},
      ExternalId: '${env:SMS_AUTH_EXTERNAL_ID}',
      SnsRegion: '${env:REGION}',
    },
  },
};

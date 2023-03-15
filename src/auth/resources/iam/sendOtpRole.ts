import createLambdaRole from '~/shared/utils/createLambdaRole';

export const SendOtpRole = createLambdaRole('sendOtp', [
  {
    PolicyName: 'checkIfPhoneNumberOptedOut',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaSnsPermissions',
          Effect: 'Allow',
          Action: ['SNS:CheckIfPhoneNumberIsOptedOut'],
          Resource: ['*'],
        },
      ],
    },
  },
  {
    PolicyName: 'getOtp',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:GetUserAttributeVerificationCode'],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
      ],
    },
  },
]);

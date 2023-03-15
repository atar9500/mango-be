import createLambdaRole from '~/shared/utils/createLambdaRole';

export const VerifyOtpRole = createLambdaRole('verifyOtp', [
  {
    PolicyName: 'verifyPhoneNumber',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:VerifyUserAttribute'],
          Resource: {'Fn::GetAtt': ['UserPool', 'Arn']},
        },
      ],
    },
  },
]);

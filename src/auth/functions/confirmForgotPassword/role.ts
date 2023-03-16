import createLambdaRole from '~/shared/utils/createLambdaRole';

export const ConfirmForgotPasswordRole = createLambdaRole(
  'confirmForgotPassword',
  [
    {
      PolicyName: 'confirmForgotPassword',
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'LambdaCognitoPermissions',
            Effect: 'Allow',
            Action: ['cognito-idp:ConfirmForgotPassword'],
            Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
          },
        ],
      },
    },
  ],
);

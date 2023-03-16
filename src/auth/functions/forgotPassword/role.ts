import createLambdaRole from '~/shared/utils/createLambdaRole';

export const ForgotPasswordRole = createLambdaRole('forgotPassword', [
  {
    PolicyName: 'forgotPassword',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:ForgotPassword'],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
      ],
    },
  },
]);

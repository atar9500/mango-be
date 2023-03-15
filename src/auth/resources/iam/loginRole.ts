import createLambdaRole from '~/shared/utils/createLambdaRole';

export const LoginRole = createLambdaRole('login', [
  {
    PolicyName: 'login',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:AdminInitiateAuth'],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
      ],
    },
  },
]);

import createLambdaRole from '~/shared/utils/createLambdaRole';

export const SignUpRole = createLambdaRole('signUp', [
  {
    PolicyName: 'signUpUser',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:AdminCreateUser'],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:PutItem'],
          Resource: [{'Fn::GetAtt': ['UsersTable', 'Arn']}],
        },
      ],
    },
  },
]);

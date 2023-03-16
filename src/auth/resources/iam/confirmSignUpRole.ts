import createLambdaRole from '~/shared/utils/createLambdaRole';

export const ConfirmSignUpRole = createLambdaRole('confirmSignUp', [
  {
    PolicyName: 'confirmSignUp',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: [
            'cognito-idp:RespondToAuthChallenge',
            'cognito-idp:AdminUpdateUserAttributes',
          ],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:GetItem'],
          Resource: [{'Fn::GetAtt': ['UsersTable', 'Arn']}],
        },
      ],
    },
  },
]);

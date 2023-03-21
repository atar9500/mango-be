import createLambdaRole from '~/shared/utils/createLambdaRole';

export const UpdateUserRole = createLambdaRole('updateUser', [
  {
    PolicyName: 'updateUser',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:UpdateItem'],
          Resource: [{'Fn::GetAtt': ['UsersTable', 'Arn']}],
        },
      ],
    },
  },
]);

import createLambdaRole from '~/shared/utils/createLambdaRole';

export const UpdateAvatarRole = createLambdaRole('updateAvatar', [
  {
    PolicyName: 'updateAvatar',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:UpdateItem'],
          Resource: [{'Fn::GetAtt': ['UsersTable', 'Arn']}],
        },
        {
          Sid: 'LambdaS3WritePermissions',
          Effect: 'Allow',
          Action: ['s3:PutObject', 's3:DeleteObject', 's3:PutObjectAcl'],
          Resource: [
            {
              'Fn::Join': ['', [{'Fn::GetAtt': ['UsersBucket', 'Arn']}, '/*']],
            },
          ],
        },
      ],
    },
  },
]);

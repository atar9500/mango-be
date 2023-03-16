import createLambdaRole from '~/shared/utils/createLambdaRole';

export const EditNoteRole = createLambdaRole('editNote', [
  {
    PolicyName: 'editNote',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:UpdateItem'],
          Resource: [{'Fn::GetAtt': ['NotesTable', 'Arn']}],
        },
        {
          Sid: 'LambdaS3WritePermissions',
          Effect: 'Allow',
          Action: ['s3:PutObject'],
          Resource: [
            {
              'Fn::Join': ['', [{'Fn::GetAtt': ['NotesBucket', 'Arn']}, '/*']],
            },
          ],
        },
      ],
    },
  },
]);

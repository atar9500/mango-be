import createLambdaRole from '~/shared/utils/createLambdaRole';

export const CreateNoteRole = createLambdaRole('createNote', [
  {
    PolicyName: 'createNote',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:PutItem'],
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

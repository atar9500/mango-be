import createLambdaRole from '~/shared/utils/createLambdaRole';

export const DeleteNoteRole = createLambdaRole('deleteNote', [
  {
    PolicyName: 'deleteNote',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaDynamodbWritePermissions',
          Effect: 'Allow',
          Action: ['dynamodb:DeleteItem'],
          Resource: [{'Fn::GetAtt': ['NotesTable', 'Arn']}],
        },
        {
          Sid: 'LambdaS3WritePermissions',
          Effect: 'Allow',
          Action: ['s3:DeleteObject'],
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

import createLambdaRole from '~/shared/utils/createLambdaRole';

export const GetNoteContentRole = createLambdaRole('getNoteContent', [
  {
    PolicyName: 'getNoteContentNote',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaS3ReadPermissions',
          Effect: 'Allow',
          Action: ['s3:GetObject'],
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

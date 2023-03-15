import createLambdaRole from '~/shared/utils/createLambdaRole';

export const GetNotesRole = createLambdaRole('getNotes', [
  {
    PolicyName: 'getNotes',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaDynamodbReadPermissions',
          Effect: 'Allow',
          Action: ['dynamodb:Query'],
          Resource: [{'Fn::GetAtt': ['NotesTable', 'Arn']}],
        },
        {
          Sid: 'LambdaS3WritePermissions',
          Effect: 'Allow',
          Action: ['s3:GetObject'],
          Resource: [{'Fn::GetAtt': ['NotesBucket', 'Arn']}],
        },
      ],
    },
  },
]);

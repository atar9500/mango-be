import {loggingPolicy} from '~/shared/resources/policies';

export const DeleteNoteRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-deleteNoteRole',
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {Service: 'lambda.amazonaws.com'},
          Action: 'sts:AssumeRole',
        },
      ],
    },
    Policies: [
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
                  'Fn::Join': [
                    '',
                    [{'Fn::GetAtt': ['NotesBucket', 'Arn']}, '/*'],
                  ],
                },
              ],
            },
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

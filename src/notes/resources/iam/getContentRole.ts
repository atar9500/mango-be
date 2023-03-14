import {loggingPolicy} from '~/shared/resources/policies';

export const GetNoteContentRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-getNoteContentRole',
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

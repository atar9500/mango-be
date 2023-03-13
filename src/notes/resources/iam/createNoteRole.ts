import {loggingPolicy} from '~/shared/resources/policies';

export const CreateNoteRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-createNoteRole',
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
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

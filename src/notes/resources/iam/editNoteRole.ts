import {loggingPolicy} from '~/shared/resources/policies';

export const EditNoteRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-editNoteRole',
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
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

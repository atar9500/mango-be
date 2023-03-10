export const GetNotesRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-getNotesRole',
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
          ],
        },
      },
    ],
  },
};

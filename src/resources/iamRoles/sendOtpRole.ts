export const SendOtpRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-sendOtpRole',
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
        PolicyName: 'sendOtp',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaSnsPublishPermissions',
              Effect: 'Allow',
              Action: ['SNS:Publish', 'SNS:CheckIfPhoneNumberIsOptedOut'],
              Resource: ['*'],
            },
          ],
        },
      },
      {
        PolicyName: 'saveOtp',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaDynamoDbWritePermissions',
              Effect: 'Allow',
              Action: ['dynamodb:PutItem'],
              Resource: [{'Fn::GetAtt': ['OtpTable', 'Arn']}],
            },
          ],
        },
      },
    ],
  },
};

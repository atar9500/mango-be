export const VerifyOtpRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-verifyOtpRole',
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
        PolicyName: 'verifyOtp',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaDyanmodbReadPermissions',
              Effect: 'Allow',
              Action: ['dynamodb:GetItem', 'dynamodb:DeleteItem'],
              Resource: {'Fn::GetAtt': ['OtpTable', 'Arn']},
            },
          ],
        },
      },
      {
        PolicyName: 'setPhoneNumber',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaCognitoWritePermissions',
              Effect: 'Allow',
              Action: ['cognito-idp:UpdateUserAttributes'],
              Resource: {'Fn::GetAtt': ['CognitoUserPool', 'Arn']},
            },
          ],
        },
      },
    ],
  },
};

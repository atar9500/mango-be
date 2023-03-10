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
        PolicyName: 'CheckOptedOutPhoneNumber',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaSnsPermissions',
              Effect: 'Allow',
              Action: ['SNS:CheckIfPhoneNumberIsOptedOut'],
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
              Sid: 'LambdaCognitoPermissions',
              Effect: 'Allow',
              Action: [
                'cognito-idp:UpdateUserAttributes',
                'cognito-idp:GetUserAttributeVerificationCode',
              ],
              Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
            },
          ],
        },
      },
    ],
  },
};

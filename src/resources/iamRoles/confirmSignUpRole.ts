export const ConfirmSignUpRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-confirmSignUpRole',
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
        PolicyName: 'login',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaCognitoPermissions',
              Effect: 'Allow',
              Action: [
                'cognito-idp:respondToAuthChallenge',
                'cognito-idp:adminUpdateUserAttributes',
              ],
              Resource: [{'Fn::GetAtt': ['CognitoUserPool', 'Arn']}],
            },
          ],
        },
      },
    ],
  },
};

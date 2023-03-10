export const SignUpRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-signUpRole',
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
        PolicyName: 'signUpUser',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaCognitoPermissions',
              Effect: 'Allow',
              Action: ['cognito-idp:adminCreateUser'],
              Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
            },
          ],
        },
      },
    ],
  },
};

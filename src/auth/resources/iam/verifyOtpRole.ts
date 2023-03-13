import {loggingPolicy} from '~/shared/resources/policies';

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
        PolicyName: 'setPhoneNumber',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaCognitoPermissions',
              Effect: 'Allow',
              Action: ['cognito-idp:VerifyUserAttribute'],
              Resource: {'Fn::GetAtt': ['UserPool', 'Arn']},
            },
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

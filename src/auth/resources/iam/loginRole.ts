import {loggingPolicy} from '~/shared/resources/policies';

export const LoginRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-loginRole',
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
              Action: ['cognito-idp:AdminInitiateAuth'],
              Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
            },
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

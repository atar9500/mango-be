import {loggingPolicy} from '~/shared/resources/policies';

export const UpdateUserDetailsRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-updateUserDetailsRole',
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
        PolicyName: 'updateUserDetails',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'LambdaCognitoPermissions',
              Effect: 'Allow',
              Action: ['cognito-idp:UpdateUserAttributes'],
              Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
            },
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

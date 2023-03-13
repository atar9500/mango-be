import {loggingPolicy} from '~/shared/resources/policies';

export const SMSAuthRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${env:SERVICE}-smsAuthRole',
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {Service: 'cognito-idp.amazonaws.com'},
          Action: ['sts:AssumeRole'],
          Condition: {
            StringEquals: {'sts:ExternalId': '${env:SMS_AUTH_EXTERNAL_ID}'},
          },
        },
      ],
    },
    Policies: [
      {
        PolicyName: '${env:SERVICE}-smsAuthRole',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: ['SNS:Publish'],
              Resource: ['*'],
            },
          ],
        },
      },
      loggingPolicy,
    ],
  },
};

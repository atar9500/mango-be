const TOPIC_NAME = '${env:SERVICE}-sms_auth';

export const SMSAuthService = {
  Type: 'AWS::SNS::Topic',
  Properties: {
    DisplayName: 'SMS User Authentication',
    TopicName: TOPIC_NAME,
  },
};

export const SMSAuthIAMRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: `${TOPIC_NAME}-role`,
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: '',
          Effect: 'Allow',
          Principal: {Service: 'cognito-idp.amazonaws.com'},
          Action: ['sts:AssumeRole'],
          Condition: {
            StringEquals: {'SNS:ExternalId': '${env:SMS_AUTH_EXTERNAL_ID}'},
          },
        },
      ],
    },
    Policies: [
      {
        PolicyName: `${TOPIC_NAME}-policy`,
        PolicyDocument: {
          Version: '2012-10-17',
          Effect: 'Allow',
          Action: ['SNS:Publish'],
          Resource: [{'Fn::GetAtt': ['SMSAuthService', 'Arn']}],
        },
      },
    ],
  },
};

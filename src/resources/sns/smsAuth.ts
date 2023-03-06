const TOPIC_NAME = '${env:SERVICE}-sms_auth';

export const SMSAuthService = {
  Type: 'AWS::SNS::Topic',
  Properties: {
    DisplayName: 'SMS User Authentication',
    TopicName: TOPIC_NAME,
  },
};

export const SMSAuthIAMRole = {
  Effect: 'Allow',
  Action: ['SNS:Publish'],
  Resource: [`arn:aws:sns:\${env:REGION}:\${aws:accountId}:${TOPIC_NAME}`],
  Condition: {StringEquals: {'SNS:ExternalId': '${env:SMS_AUTH_EXTERNAL_ID}'}},
};

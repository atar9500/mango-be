const TOPIC_NAME = '${env:SERVICE}-sms_auth';

export const SMSAuthService = {
  Type: 'AWS::SNS::Topic',
  Properties: {
    DisplayName: 'SMS User Authentication',
    TopicName: TOPIC_NAME,
  },
};

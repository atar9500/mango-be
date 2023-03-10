export const otpTableName = '${env:SERVICE}-otp_table';

export const OtpTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: otpTableName,
    AttributeDefinitions: [{AttributeName: 'hash', AttributeType: 'S'}],
    KeySchema: [{AttributeName: 'hash', KeyType: 'HASH'}],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TimeToLiveSpecification: {
      AttributeName: 'ttl',
      Enabled: true,
    },
  },
};

export const OtpTableIAMRole = {
  Effect: 'Allow',
  Action: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:DeleteItem'],
  Resource: [{'Fn::GetAtt': ['OtpTable', 'Arn']}],
};

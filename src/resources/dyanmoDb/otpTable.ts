const TABLE_NAME = '${env:SERVICE}-opt_table';

export const OtpTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: TABLE_NAME,
    AttributeDefinitions: [{AttributeName: 'hash', AttributeType: 'S'}],
    KeySchema: [{AttributeName: 'hash', KeyType: 'HASH'}],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TimeToLiveSpecification: {
      AttributeName: 'ttl',
      TimeToLiveStatus: 'ENABLED',
    },
  },
};

export const OtpTableIAMRole = {
  Effect: 'Allow',
  Action: [
    'dynamodb:DescribeTable',
    'dynamodb:Query',
    'dynamodb:Scan',
    'dynamodb:GetItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
    'dynamodb:DeleteItem',
  ],
  Resource: [{'Fn::GetAtt': ['OTPTable', 'Arn']}],
};

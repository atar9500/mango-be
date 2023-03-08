const TABLE_NAME = '${env:SERVICE}-opt_table';

export const OTPTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: TABLE_NAME,
    AttributeDefinitions: [
      {AttributeName: 'email', AttributeType: 'S'},
      {AttributeName: 'phone_number', AttributeType: 'S'},
      {AttributeName: 'otp', AttributeType: 'S'},
    ],
    KeySchema: [
      {AttributeName: 'email', KeyType: 'HASH'},
      {AttributeName: 'phone_number', KeyType: 'RANGE'},
    ],
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

export const OTPTableIAMRole = {
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

export const UsersTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: '${env:SERVICE}-users_table',
    AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
    KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};

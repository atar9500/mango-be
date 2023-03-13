export const NotesTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: '${env:SERVICE}-notes_table',
    AttributeDefinitions: [
      {AttributeName: 'author', AttributeType: 'S'},
      {AttributeName: 'id', AttributeType: 'S'},
    ],
    KeySchema: [
      {AttributeName: 'author', KeyType: 'HASH'},
      {AttributeName: 'id', KeyType: 'RANGE'},
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};

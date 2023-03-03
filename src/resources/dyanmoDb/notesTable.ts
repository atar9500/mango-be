export const NotesTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: 'NotesTable',
    AttributeDefinitions: [
      {AttributeName: 'authorId', AttributeType: 'S'},
      {AttributeName: 'id', AttributeType: 'S'},
    ],
    KeySchema: [
      {AttributeName: 'authorId', KeyType: 'HASH'},
      {AttributeName: 'id', KeyType: 'RANGE'},
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};

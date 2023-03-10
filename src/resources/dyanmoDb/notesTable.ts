export const notesTableName = '${env:SERVICE}-notes_table';

export const NotesTable = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: notesTableName,
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

export const NotesTableIAMRole = {
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
  Resource: [{'Fn::GetAtt': ['NotesTable', 'Arn']}],
};

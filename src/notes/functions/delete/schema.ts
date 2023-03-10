const schema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    authorId: {type: 'string'},
  },
  required: ['id', 'authorId'],
} as const;

export default schema;

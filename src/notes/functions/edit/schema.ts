const schema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    content: {type: 'string'},
    color: {type: 'string'},
    authorId: {type: 'string'},
  },
  required: ['id', 'authorId'],
} as const;

export default schema;

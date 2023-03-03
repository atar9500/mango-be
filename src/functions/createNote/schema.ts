const schema = {
  type: 'object',
  properties: {
    title: {type: 'string'},
    content: {type: 'string'},
    color: {type: 'string'},
    authorId: {type: 'string'},
  },
  required: ['title', 'color', 'authorId'],
} as const;

export default schema;

const schema = {
  type: 'object',
  properties: {
    title: {type: 'string'},
    content: {type: 'string'},
    color: {type: 'string'},
  },
  required: ['title', 'color', 'content'],
} as const;

export default schema;

const schema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    content: {type: 'string'},
    color: {type: 'string'},
  },
  required: ['id'],
} as const;

export default schema;

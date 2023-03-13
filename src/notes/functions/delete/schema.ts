const schema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
  },
  required: ['id'],
} as const;

export default schema;

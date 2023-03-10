const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    name: {type: 'string'},
  },
  required: ['email', 'name'],
} as const;

export default schema;

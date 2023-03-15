const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
  },
  required: ['email'],
} as const;

export default schema;

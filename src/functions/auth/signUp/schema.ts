const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    name: {type: 'string'},
    password: {type: 'string'},
  },
  required: ['email', 'name', 'password'],
} as const;

export default schema;

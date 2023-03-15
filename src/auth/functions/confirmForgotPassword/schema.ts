const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    password: {type: 'string'},
    code: {type: 'string'},
  },
  required: ['email', 'password', 'code'],
} as const;

export default schema;

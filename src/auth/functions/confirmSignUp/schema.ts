const schema = {
  type: 'object',
  properties: {
    challengeName: {type: 'string'},
    password: {type: 'string'},
    email: {type: 'string'},
  },
  required: ['email', 'password', 'challengeName'],
} as const;

export default schema;

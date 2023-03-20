const schema = {
  type: 'object',
  properties: {
    challenge: {type: 'string'},
    password: {type: 'string'},
    email: {type: 'string'},
  },
  required: ['email', 'password', 'challenge'],
} as const;

export default schema;

const schema = {
  type: 'object',
  properties: {
    challengeName: {type: 'string'},
    password: {type: 'string'},
    email: {type: 'string'},
    session: {type: 'string'},
  },
  required: ['email', 'password', 'challengeName', 'session'],
} as const;

export default schema;

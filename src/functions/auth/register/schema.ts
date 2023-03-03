const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    mame: {type: 'string'},
    password: {type: 'string'},
  },
  required: ['email', 'mame', 'password'],
} as const;

export default schema;

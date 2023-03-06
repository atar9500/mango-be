const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    password: {type: 'string'},
    phone_number: {type: 'string'},
  },
  required: ['password'],
} as const;

export default schema;

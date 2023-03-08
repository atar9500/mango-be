const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    phoneNumber: {type: 'string'},
  },
  required: ['email', 'phoneNumber'],
} as const;

export default schema;

const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    name: {type: 'string'},
    phoneNumber: {type: 'string'},
  },
  required: ['email', 'phoneNumber', 'name'],
} as const;

export default schema;

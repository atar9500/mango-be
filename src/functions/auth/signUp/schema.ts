const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    name: {type: 'string'},
    phone_number: {type: 'string'},
  },
  required: ['email', 'phone_number', 'name'],
} as const;

export default schema;

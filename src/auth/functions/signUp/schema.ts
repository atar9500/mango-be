const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
  },
  required: ['email', 'firstName', 'lastName'],
} as const;

export default schema;

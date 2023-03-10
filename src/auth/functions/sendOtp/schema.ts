const schema = {
  type: 'object',
  properties: {
    phoneNumber: {type: 'string'},
  },
  required: ['phoneNumber'],
} as const;

export default schema;

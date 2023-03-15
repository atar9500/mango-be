const schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    phoneNumber: {type: 'string'},
  },
} as const;

export default schema;

const schema = {
  type: 'object',
  properties: {
    code: {type: 'string'},
  },
  required: ['code'],
} as const;

export default schema;

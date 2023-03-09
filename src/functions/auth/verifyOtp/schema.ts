const schema = {
  type: 'object',
  properties: {
    phoneNumber: {type: 'string'},
    otp: {type: 'string'},
  },
  required: ['phoneNumber', 'otp'],
} as const;

export default schema;

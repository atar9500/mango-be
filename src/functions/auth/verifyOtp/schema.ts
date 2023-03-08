const schema = {
  type: 'object',
  properties: {
    email: {type: 'string'},
    phoneNumber: {type: 'string'},
    otp: {type: 'string'},
  },
  required: ['email', 'phoneNumber', 'otp'],
} as const;

export default schema;

const schema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    content: {type: 'string'},
    color: {type: 'string'},
    archived: {type: 'boolean'},
  },
  required: ['id'],
} as const;

export default schema;

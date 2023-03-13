const schema = {
  type: 'object',
  properties: {
    title: {type: 'string'},
    content: {type: 'string'},
    color: {type: 'string'},
    archived: {type: 'boolean'},
  },
  required: ['title', 'color'],
} as const;

export default schema;

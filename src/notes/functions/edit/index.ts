import handlerPath from '~/shared/utils/handlerPath';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['EditNoteRole', 'Arn']},
  events: [
    {
      httpApi: {
        method: 'post',
        path: 'note',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

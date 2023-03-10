import handlerPath from '~/shared/utils/handlerPath';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['DeleteNoteRole', 'Arn']},
  events: [
    {
      httpApi: {
        method: 'delete',
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

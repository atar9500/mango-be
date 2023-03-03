import {handlerPath} from '~/shared/libs/handler-resolver';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/register',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

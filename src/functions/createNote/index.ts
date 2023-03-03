import schema from './schema';
import {handlerPath} from '~/shared/libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'createNote',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

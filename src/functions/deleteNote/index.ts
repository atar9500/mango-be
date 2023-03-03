import schema from './schema';
import {handlerPath} from '~/shared/libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'deleteNote',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

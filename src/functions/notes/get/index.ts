// import schema from './schema';
import handlerPath from '~/shared/utils/handlerPath';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'note',
      },
    },
  ],
};

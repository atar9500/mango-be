// import schema from './schema';
import handlerPath from '~/shared/utils/handlerPath';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['GetNotesRole', 'Arn']},
  events: [
    {
      httpApi: {
        method: 'get',
        path: 'note',
      },
    },
  ],
};

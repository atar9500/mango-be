import handlerPath from '~/shared/utils/handlerPath';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['LoginRole', 'Arn']},
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/refresh',
        cors: true,
      },
    },
  ],
};

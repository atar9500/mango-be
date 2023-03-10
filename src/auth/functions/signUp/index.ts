import handlerPath from '~/shared/utils/handlerPath';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['SignUpRole', 'Arn']},
  events: [
    {
      httpApi: {
        method: 'post',
        path: 'auth/signup',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

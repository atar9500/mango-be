import handlerPath from '~/shared/utils/handlerPath';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['ConfirmSignUpRole', 'Arn']},
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/confirmSignUp',
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

import handlerPath from '~/shared/utils/handlerPath';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['ConfirmForgotPasswordRole', 'Arn']},
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/confirm_forgot_password',
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

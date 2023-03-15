import handlerPath from '~/shared/utils/handlerPath';

import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['UpdateUserDetailsRole', 'Arn']},
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/update_user_details',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        authorizer: {
          type: 'COGNITO_USER_POOLS',
          authorizerId: {Ref: 'CognitoAuthorizer'},
        },
      },
    },
  ],
};

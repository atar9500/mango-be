// import schema from './schema';
import handlerPath from '~/shared/utils/handlerPath';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['GetNotesRole', 'Arn']},
  events: [
    {
      http: {
        method: 'get',
        path: 'note',
        authorizer: {
          type: 'COGNITO_USER_POOLS',
          authorizerId: {Ref: 'CognitoAuthorizer'},
        },
      },
    },
  ],
};

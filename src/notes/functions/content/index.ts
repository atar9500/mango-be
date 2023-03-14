// import schema from './schema';
import handlerPath from '~/shared/utils/handlerPath';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: {'Fn::GetAtt': ['GetNoteContentRole', 'Arn']},
  events: [
    {
      http: {
        method: 'get',
        path: 'note/content',
        authorizer: {
          type: 'COGNITO_USER_POOLS',
          authorizerId: {Ref: 'CognitoAuthorizer'},
        },
      },
    },
  ],
};

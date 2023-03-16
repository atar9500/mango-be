import createLambdaRole from '~/shared/utils/createLambdaRole';

export const RefreshRole = createLambdaRole('refresh', [
  {
    PolicyName: 'refresh',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:InitiateAuth'],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
      ],
    },
  },
]);

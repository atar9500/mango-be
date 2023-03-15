import createLambdaRole from '~/shared/utils/createLambdaRole';

export const UpdateUserDetailsRole = createLambdaRole('updateUserDetails', [
  {
    PolicyName: 'updateUserDetails',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'LambdaCognitoPermissions',
          Effect: 'Allow',
          Action: ['cognito-idp:UpdateUserAttributes'],
          Resource: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
        },
      ],
    },
  },
]);

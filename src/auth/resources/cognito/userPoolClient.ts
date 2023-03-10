const CLIENT_NAME = '${env:SERVICE}-user_pool_client';

export const UserPoolClient = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    ClientName: CLIENT_NAME,
    GenerateSecret: false,
    UserPoolId: {Ref: 'UserPool'},
    AccessTokenValidity: 5,
    IdTokenValidity: 5,
    ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH', 'USER_PASSWORD_AUTH'],
  },
};

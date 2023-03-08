const CLIENT_NAME = '${env:SERVICE}-user_pool_client';

export const CognitoUserPoolClient = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    ClientName: CLIENT_NAME,
    GenerateSecret: true,
    UserPoolId: {Ref: 'CognitoUserPool'},
    AccessTokenValidity: 5,
    IdTokenValidity: 5,
    ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH', 'USER_PASSWORD_AUTH'],
  },
};

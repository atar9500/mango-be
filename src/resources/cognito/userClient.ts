const userClient = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    ClientName: '${env:CLIENT_NAME}',
    GenerateSecret: true,
    UserPoolId: '${env:USER_POOL_ID}',
    AccessTokenValidity: 5,
    IdTokenValidity: 5,
    ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
  },
};

export default userClient;

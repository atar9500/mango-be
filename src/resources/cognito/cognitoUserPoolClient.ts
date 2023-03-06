const cognitoUserPoolClient = {
  Type: 'AWS::Cognito::UserPoolClient',
  Properties: {
    ClientName: '${env:USER_POOL_CLIENT_NAME}',
    GenerateSecret: true,
    UserPoolId: {Ref: 'CognitoUserPool'},
    AccessTokenValidity: 5,
    IdTokenValidity: 5,
    ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
  },
};

export default cognitoUserPoolClient;

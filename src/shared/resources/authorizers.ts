export const CognitoAuthorizer = {
  Type: 'AWS::ApiGateway::Authorizer',
  Properties: {
    RestApiId: {Ref: 'ApiGatewayRestApi'},
    Type: 'COGNITO_USER_POOLS',
    IdentitySource: 'method.request.header.Authorization',
    AuthorizerResultTtlInSeconds: 300,
    Name: 'CognitoAuthorizer',
    ProviderARNs: [{'Fn::GetAtt': ['UserPool', 'Arn']}],
  },
};

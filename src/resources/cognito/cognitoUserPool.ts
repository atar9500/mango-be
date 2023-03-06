const cognitoUserPool = {
  Type: 'AWS::Cognito::UserPool',
  Properties: {
    UserPoolName: '${env:USER_POOL_NAME}',
    Schema: [
      {
        Name: 'email',
        Required: true,
        Mutable: true,
      },
      {
        Name: 'name',
        Required: true,
        Mutable: true,
      },
    ],
    Policies: {PasswordPolicy: {MinimumLength: 6}},
    AutoVerifiedAttributes: ['email'],
  },
};

export default cognitoUserPool;

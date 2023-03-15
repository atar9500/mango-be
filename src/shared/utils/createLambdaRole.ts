export const loggingPolicy = {
  PolicyName: 'logging',
  PolicyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'LoggingPermissions',
        Effect: 'Allow',
        Action: [
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        Resource: '*',
      },
    ],
  },
};

const createLambdaRole = (
  name: string,
  policies: Record<string, unknown>[] = [],
) => ({
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: `\${env:SERVICE}-${name}Role`,
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {Service: 'lambda.amazonaws.com'},
          Action: 'sts:AssumeRole',
        },
      ],
    },
    Policies: [...policies, loggingPolicy],
  },
});

export default createLambdaRole;

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

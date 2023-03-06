/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {AWS} from '@serverless/typescript';

import * as functions from '~/functions';
import * as dynamoDbTables from '~/resources/dyanmoDb';
import * as cognito from '~/resources/cognito';

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: '${env:SERVICE}',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    // @ts-ignore
    region: '${env:REGION}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NOTES_TABLE: '${env:NOTES_TABLE}',
      USER_POOL_ID: {Ref: 'CognitoUserPool'},
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              'cognito-idp:AdminInitiateAuth',
              'cognito-idp:AdminCreateUser',
              'cognito-idp:AdminSetUserPassword',
            ],
            Resource: '*',
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      ...dynamoDbTables,
      ...cognito,
    },
  },
  // import the function via paths
  functions,
  package: {individually: true},
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: {'require.resolve': undefined},
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;

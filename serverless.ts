/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {AWS} from '@serverless/typescript';

import * as functions from '~/functions';
import {dynamoDBResources, dynamoDBIAMRoles} from '~/resources/dyanmoDb';
import {cognitoIAMRoles, cognitoResources} from '~/resources/cognito';
import {SNSResources} from '~/resources/sns';

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
      NOTES_TABLE: '${env:SERVICE}-notes_table',
      OTP_TABLE: '${env:SERVICE}-otp-table',
      USER_POOL_ID: {Ref: 'CognitoUserPool'},
      SECRET: '$:env:SECRET',
    },
    iam: {
      role: {
        statements: [...cognitoIAMRoles, ...dynamoDBIAMRoles],
      },
    },
  },
  resources: {
    Resources: {
      ...dynamoDBResources,
      ...cognitoResources,
      ...SNSResources,
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

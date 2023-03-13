/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {AWS} from '@serverless/typescript';

import * as authFunctions from '~/auth/functions';
import * as authResources from '~/auth/resources';
import * as notesFunctions from '~/notes/functions';
import * as notesResources from '~/notes/resources';
import * as sharedResources from '~/shared/resources';

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
      USER_POOL_ID: {Ref: 'UserPool'},
      USER_POOL_CLIENT_ID: {Ref: 'UserPoolClient'},
      SECRET: '$:env:SECRET',
    },
  },
  resources: {
    Resources: {...authResources, ...notesResources, ...sharedResources},
  },
  // import the function via paths
  functions: {...authFunctions, ...notesFunctions},
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

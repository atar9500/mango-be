/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {AWS} from '@serverless/typescript';

import * as authFunctions from '~/auth/functions';
import * as authResources from '~/auth/resources';
import * as notesFunctions from '~/notes/functions';
import * as notesResources from '~/notes/resources';
import * as usersFunctions from '~/users/functions';
import * as usersResources from '~/users/resources';
import * as sharedResources from '~/shared/resources';

const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: '${env:SERVICE}',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-apigw-binary'],
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
      USER_POOL_ID: {Ref: 'UserPool'},
      USER_POOL_CLIENT_ID: {Ref: 'UserPoolClient'},
      NOTES_TABLE: '${env:SERVICE}-notes_table',
      NOTES_BUCKET: '${env:SERVICE}-notes-bucket',
      USERS_TABLE: '${env:SERVICE}-users_table',
      USERS_BUCKET: '${env:SERVICE}-users-bucket',
      SECRET: '$:env:SECRET',
    },
  },
  resources: {
    Resources: {
      ...authResources,
      ...notesResources,
      ...sharedResources,
      ...usersResources,
    },
  },
  functions: {...authFunctions, ...notesFunctions, ...usersFunctions},
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
    apigwBinary: {
      types: ['multipart/form-data'],
    },
  },
};

module.exports = serverlessConfiguration;

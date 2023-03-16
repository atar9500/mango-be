import {CognitoIdentityServiceProvider, DynamoDB} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';
import {parseIdToken} from '~/shared/utils/headerParsers';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();
const db = new DynamoDB.DocumentClient();

type LoginUserLambda = APIGatewayHandler<typeof Schema>;

const loginUser: LoginUserLambda = async event => {
  const {AuthenticationResult, ...response} = await cognito
    .respondToAuthChallenge({
      ChallengeName: event.body.challengeName,
      ClientId: process.env.USER_POOL_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: event.body.email,
        NEW_PASSWORD: event.body.password,
      },
      Session: event.headers.Session,
    })
    .promise();

  if (AuthenticationResult) {
    await cognito
      .adminUpdateUserAttributes({
        UserPoolId: process.env.USER_POOL_ID,
        Username: event.body.email,
        UserAttributes: [{Name: 'email_verified', Value: 'true'}],
      })
      .promise();

    const {id, ...user} = parseIdToken(AuthenticationResult.IdToken);
    const {Item} = await db
      .get({
        TableName: process.env.USERS_TABLE,
        Key: {id},
        ProjectionExpression: 'firstName, lastName',
      })
      .promise();

    return formatJSONResponse(
      {...user, ...Item},
      {
        headers: {
          'Access-Token': AuthenticationResult.AccessToken,
          'Refresh-Token': AuthenticationResult.RefreshToken,
          'Id-Token': AuthenticationResult.IdToken,
        },
      },
    );
  }

  return formatJSONResponse(response);
};

export const main = middyfyLambda(loginUser);

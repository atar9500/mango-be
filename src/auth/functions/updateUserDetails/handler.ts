import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import {middyfy} from '~/shared/libs/lambda';
import extractBearerToken from '~/shared/utils/extractBearerToken';
import getUpdateParams from '~/shared/utils/getUpdateParams';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type LoginLambda = APIGatewayHandler<typeof Schema>;

const login: LoginLambda = async event => {
  const accessToken = extractBearerToken(event.headers['Access-Token']);

  await cognito
    .updateUserAttributes({
      AccessToken: accessToken,
      UserAttributes: getUpdateParams(event.body),
    })
    .promise();

  // if (event.body.phoneNumber) {
  //   await cognito
  //     .getUserAttributeVerificationCode({
  //       AccessToken: accessToken,
  //       AttributeName: 'phone_number',
  //     })
  //     .promise();
  // }

  return formatJSONResponse({});
};

export const main = middyfy(login);

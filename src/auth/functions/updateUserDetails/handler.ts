import {CognitoIdentityServiceProvider} from 'aws-sdk';

import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';
import getUpdateParams from '~/shared/utils/getUpdateParams';

import Schema from './schema';

const cognito = new CognitoIdentityServiceProvider();

type UpdateUserDetailsLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const updateUserDetails: UpdateUserDetailsLambda = async ({
  accessToken,
  body,
}) => {
  await cognito
    .updateUserAttributes({
      AccessToken: accessToken,
      UserAttributes: getUpdateParams(body),
    })
    .promise();

  return formatJSONResponse({});
};

export const main = middyfyLambda(updateUserDetails, {authorized: true});

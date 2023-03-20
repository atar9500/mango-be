import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import usersMiddleware from '../../middlewares/usersMiddleware';
import {UsersAPIGatewayHandler} from '../../types/usersApiGateway';

type UpdateUserLambda = UsersAPIGatewayHandler<typeof Schema>;

const updateUser: UpdateUserLambda = async ({body, service}) => {
  await service.updateUser(body);
  return formatJSONResponse({});
};

export const main = middyfyLambda(updateUser, {authorized: true}).use(
  usersMiddleware(),
);

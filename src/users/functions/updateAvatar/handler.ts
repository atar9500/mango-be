import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import usersMiddleware from '../../middlewares/usersMiddleware';
import {UsersAPIGatewayHandler} from '../../types/usersApiGateway';

type UpdateAvatarLambda = UsersAPIGatewayHandler<typeof Schema>;

const updateAvatar: UpdateAvatarLambda = async event => {
  const avatar = await event.service.updateAvatar({event});
  return formatJSONResponse({avatar});
};

export const main = middyfyLambda(updateAvatar, {authorized: true}).use(
  usersMiddleware(),
);

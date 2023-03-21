import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import usersMiddleware from '../../middlewares/usersMiddleware';
import {UsersAPIGatewayHandler} from '../../types/usersApiGateway';

type UpdateAvatarLambda = UsersAPIGatewayHandler<typeof Schema>;

const updateAvatar: UpdateAvatarLambda = async ({body, headers, service}) => {
  const avatar = await service.updateAvatar({
    file: body,
    type: headers['Content-Type'],
  });
  return formatJSONResponse({avatar});
};

export const main = middyfyLambda(updateAvatar, {authorized: true}).use(
  usersMiddleware(),
);

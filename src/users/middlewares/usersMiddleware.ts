import {Middleware} from '~/shared/types/middleware';

import getUsersService from '../services/usersService';
import {UsersAPIGatewayProxyEvent} from '../types/usersApiGateway';

const usersMiddleware = (): Middleware<UsersAPIGatewayProxyEvent> => ({
  before: async ({event}) => {
    if (!event.user.id) {
      throw Error('UsersMiddleware can be set only on authorized lambdas!');
    }

    event.service = getUsersService(event.user.id);
  },
});

export default usersMiddleware;

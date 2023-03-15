/* eslint-disable @typescript-eslint/ban-ts-comment */
import {AuthorizedAPIGatewayProxyEvent} from '../types/apiGateway';
import {Middleware} from '../types/middleware';
import {parseBearerToken, parseIdToken} from '../utils/headerParsers';

const authMiddleware = (): Middleware<AuthorizedAPIGatewayProxyEvent> => ({
  before: async ({event}) => {
    const user = parseIdToken(event.headers.Authorization);
    if (user) {
      event.user = user;
    }
    const accessToken = parseBearerToken(event.headers['Access-Token']);
    if (accessToken) {
      event.accessToken = accessToken;
    }
    const refreshToken = parseBearerToken(event.headers['Access-Token']);
    if (refreshToken) {
      event.refreshToken = refreshToken;
    }
  },
});

export default authMiddleware;

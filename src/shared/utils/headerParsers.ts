import * as jwt from 'jsonwebtoken';

import {UserAuth} from '../types/user';

const BEARER_REGEX = /^(Bearer+\s)*([a-zA-Z0-9-_.]+)$/;

export const parseBearerToken = (bearerToken: string) =>
  BEARER_REGEX.exec(bearerToken)[2];

export const parseIdToken = (idToken: string): UserAuth => {
  let value = idToken;
  if (BEARER_REGEX.test(idToken)) {
    value = parseBearerToken(idToken);
  }
  const {email, 'cognito:username': id} = jwt.decode(value) as jwt.JwtPayload;
  return {email, id};
};

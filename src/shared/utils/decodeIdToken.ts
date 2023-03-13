import * as jwt from 'jsonwebtoken';

import {User} from '../types/user';
import extractBearerToken, {bearerRegex} from './extractBearerToken';

const decodeIdToken = (idToken: string): User => {
  let value = idToken;
  if (bearerRegex.test(idToken)) {
    value = extractBearerToken(idToken);
  }
  const {
    name,
    email,
    'cognito:username': id,
  } = jwt.decode(value) as jwt.JwtPayload;
  return {name, email, id};
};

export default decodeIdToken;

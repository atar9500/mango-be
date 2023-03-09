import * as jwt from 'jsonwebtoken';

import {User} from '../types/user';

const decodeIdToken = (idToken: string): User => {
  const {
    name,
    email,
    'cognito:username': id,
  } = jwt.decode(idToken) as jwt.JwtPayload;
  return {name, email, id};
};

export default decodeIdToken;

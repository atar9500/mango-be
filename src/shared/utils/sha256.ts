import * as crypto from 'crypto';

const _sha256Hasher = crypto.createHmac('sha256', process.env.SECRET);

const generateHash = (...rest: string[]) =>
  _sha256Hasher.update(rest.join('-')).digest('hex');

export default generateHash;

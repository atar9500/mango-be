const BEARER_TOKEN = /^(Bearer+\s)*([a-zA-Z0-9-_.]+)$/;

const extractBearerToken = (bearerToken: string) =>
  BEARER_TOKEN.exec(bearerToken)[2];

export default extractBearerToken;

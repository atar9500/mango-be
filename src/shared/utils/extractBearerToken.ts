export const bearerRegex = /^(Bearer+\s)*([a-zA-Z0-9-_.]+)$/;

const extractBearerToken = (bearerToken: string) =>
  bearerRegex.exec(bearerToken)[2];

export default extractBearerToken;

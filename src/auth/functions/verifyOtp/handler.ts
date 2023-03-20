import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import AuthService from '../../services/authService';

type VerifyOtpLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const verifyOtp: VerifyOtpLambda = async ({accessToken, body}) => {
  await AuthService.verifyOtp({accessToken, ...body});
  return formatJSONResponse({});
};

export const main = middyfyLambda(verifyOtp, {authorized: true});

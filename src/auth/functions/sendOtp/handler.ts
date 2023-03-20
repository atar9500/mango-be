import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import AuthService from '../../services/authService';

type SendOtpLambda = AuthorizedAPIGatewayHandler<typeof Schema>;

const sendOtp: SendOtpLambda = async ({body, accessToken}) => {
  await AuthService.sendOtp({...body, accessToken});
  return formatJSONResponse({});
};

export const main = middyfyLambda(sendOtp, {authorized: true});

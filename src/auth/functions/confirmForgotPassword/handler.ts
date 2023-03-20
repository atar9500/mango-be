import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import AuthService from '../../services/authService';

type ConfirmForgotPasswordLambda = APIGatewayHandler<typeof Schema>;

const confirmForgotPassword: ConfirmForgotPasswordLambda = async event => {
  await AuthService.confirmForgotPassword(event.body);
  return formatJSONResponse({});
};

export const main = middyfyLambda(confirmForgotPassword);

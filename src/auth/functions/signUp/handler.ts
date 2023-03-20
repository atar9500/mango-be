import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import AuthService from '../../services/authService';

type SignUpLambda = APIGatewayHandler<typeof Schema>;

const signUp: SignUpLambda = async ({body}) => {
  await AuthService.signUp(body);
  return formatJSONResponse({});
};

export const main = middyfyLambda(signUp);

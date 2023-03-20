import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import AuthService from '../../services/authService';

type LoginLambda = APIGatewayHandler<typeof Schema>;

const login: LoginLambda = async event => {
  try {
    const {headers, body} = await AuthService.login(event.body);
    return formatJSONResponse(body, {headers});
  } catch (error) {
    console.error(error);
  }
};

export const main = middyfyLambda(login);

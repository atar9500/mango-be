import type {APIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import AuthService from '../../services/authService';

type LoginUserLambda = APIGatewayHandler<typeof Schema>;

const loginUser: LoginUserLambda = async event => {
  const {body, headers} = await AuthService.confirmSignUp({
    ...event.body,
    session: event.headers['Session'],
  });
  return formatJSONResponse(body, {headers});
};

export const main = middyfyLambda(loginUser);

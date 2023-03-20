import type {AuthorizedAPIGatewayHandler} from '~/shared/types/apiGateway';
import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import AuthService from '../../services/authService';

type RefreshLambda = AuthorizedAPIGatewayHandler;

const refresh: RefreshLambda = async ({refreshToken}) => {
  const result = await AuthService.refresh({refreshToken});
  return formatJSONResponse(result);
};

export const main = middyfyLambda(refresh, {authorized: true});

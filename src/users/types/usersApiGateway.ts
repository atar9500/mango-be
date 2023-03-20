import {APIGatewayProxyResult, Handler} from 'aws-lambda';

import {
  AuthorizedAPIGatewayProxyEvent,
  QueryParamsDefault,
} from '~/shared/types/apiGateway';

import {UsersService} from '../services/usersService';

export type UsersAPIGatewayProxyEvent<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = AuthorizedAPIGatewayProxyEvent<Body, QueryParams> & {
  service: UsersService;
};

export type UsersAPIGatewayHandler<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = Handler<
  UsersAPIGatewayProxyEvent<Body, QueryParams>,
  APIGatewayProxyResult
>;

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type {FromSchema} from 'json-schema-to-ts';

import {User} from './user';

type QueryParmasDefault = Record<string, string>;

export type ValidatedAPIGatewayProxyEvent<
  Body = unknown,
  QueryParams extends QueryParmasDefault = QueryParmasDefault,
> = Omit<APIGatewayProxyEvent, 'body' | 'queryStringParameters'> & {
  body: FromSchema<Body>;
  queryStringParameters?: QueryParams;
};

export type APIGatewayHandler<
  Body = unknown,
  QueryParams extends QueryParmasDefault = QueryParmasDefault,
> = Handler<
  ValidatedAPIGatewayProxyEvent<Body, QueryParams>,
  APIGatewayProxyResult
>;

export type AuthorizedAPIGatewayProxyEvent<
  Body = unknown,
  QueryParams extends QueryParmasDefault = QueryParmasDefault,
> = ValidatedAPIGatewayProxyEvent<Body, QueryParams> & {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type AuthorizedAPIGatewayHandler<
  Body = unknown,
  QueryParams extends QueryParmasDefault = QueryParmasDefault,
> = Handler<
  AuthorizedAPIGatewayProxyEvent<Body, QueryParams>,
  APIGatewayProxyResult
>;

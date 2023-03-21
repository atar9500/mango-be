import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type {FromSchema} from 'json-schema-to-ts';

import {UserAuthWithId} from './user';

export type QueryParamsDefault = Record<string, string>;

export type ValidatedAPIGatewayProxyEvent<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = Omit<APIGatewayProxyEvent, 'body' | 'queryStringParameters'> & {
  body: FromSchema<Body>;
  queryStringParameters: QueryParams;
};

export type APIGatewayHandler<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = Handler<
  ValidatedAPIGatewayProxyEvent<Body, QueryParams>,
  APIGatewayProxyResult
>;

export type AuthorizedAPIGatewayProxyEvent<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = ValidatedAPIGatewayProxyEvent<Body, QueryParams> & {
  accessToken: string;
  refreshToken: string;
  user: UserAuthWithId;
};

export type AuthorizedAPIGatewayHandler<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = Handler<
  AuthorizedAPIGatewayProxyEvent<Body, QueryParams>,
  APIGatewayProxyResult
>;

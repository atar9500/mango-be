import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type {FromSchema} from 'json-schema-to-ts';

type QueryParmasDefault = Record<string, string>;

type ValidatedAPIGatewayProxyEvent<
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

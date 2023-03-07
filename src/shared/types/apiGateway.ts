import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type {FromSchema} from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S = unknown> = Omit<
  APIGatewayProxyEvent,
  'body'
> & {
  body: FromSchema<S>;
};

export type APIGatewayHandler<S = unknown> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

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

export type ValidatedEventAPIGatewayProxyEvent<S = unknown> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = <T>(response: T, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

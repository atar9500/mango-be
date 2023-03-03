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

type ResponseObject = Record<string, unknown>;

type ResponseArray = ResponseObject[];

export const formatJSONResponse = (
  response: ResponseObject | ResponseArray
) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

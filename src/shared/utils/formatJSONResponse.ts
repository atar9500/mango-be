import {APIGatewayProxyResult} from 'aws-lambda';

type JSONResponseOptions = Partial<Omit<APIGatewayProxyResult, 'body'>>;

const formatJSONResponse = <T>(
  response: T,
  options?: JSONResponseOptions,
): APIGatewayProxyResult => ({
  body: JSON.stringify(response),
  statusCode: 200,
  ...options,
});

export default formatJSONResponse;

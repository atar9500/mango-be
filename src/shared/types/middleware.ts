import middy from '@middy/core';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

export type Middleware<
  Event = APIGatewayProxyEvent,
  Result = APIGatewayProxyResult,
> = middy.MiddlewareObj<Event, Result>;

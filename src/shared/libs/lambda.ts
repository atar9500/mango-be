import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import {Handler} from 'aws-lambda';

export const middyfy = (handler: Handler) =>
  middy(handler).use(middyJsonBodyParser()).use(httpErrorHandler());

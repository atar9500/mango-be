import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import {Handler} from 'aws-lambda';

import authMiddleware from './authMiddleware';

type MiddifyLambdaOptions = {
  authorized?: true;
};

const middyfyLambda = (
  handler: Handler,
  {authorized}: MiddifyLambdaOptions = {},
) => {
  const lambda = middy(handler)
    .use(middyJsonBodyParser())
    .use(httpErrorHandler());

  if (authorized) {
    lambda.use(authMiddleware());
  }

  return lambda;
};

export default middyfyLambda;

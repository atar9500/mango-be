import {APIGatewayProxyResult, Handler} from 'aws-lambda';

import {
  AuthorizedAPIGatewayProxyEvent,
  QueryParamsDefault,
} from '~/shared/types/apiGateway';

import {NotesService} from '../services/notesService';

export type NotesAPIGatewayProxyEvent<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = AuthorizedAPIGatewayProxyEvent<Body, QueryParams> & {
  service: NotesService;
};

export type NotesAPIGatewayHandler<
  Body = unknown,
  QueryParams extends QueryParamsDefault = QueryParamsDefault,
> = Handler<
  NotesAPIGatewayProxyEvent<Body, QueryParams>,
  APIGatewayProxyResult
>;

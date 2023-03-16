import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import {NotesAPIGatewayHandler} from '../../types/notesApiGateway';
import notesMiddleware from '../../middlewares/notesMiddleware';

type GetNotesParams = {
  title?: string;
  archived?: string;
};

type GetNotesLambda = NotesAPIGatewayHandler<unknown, GetNotesParams>;

const getNotes: GetNotesLambda = async ({queryStringParameters, service}) => {
  const notes = await service.getNotes(queryStringParameters);
  return formatJSONResponse(notes);
};

export const main = middyfyLambda(getNotes, {authorized: true}).use(
  notesMiddleware(),
);

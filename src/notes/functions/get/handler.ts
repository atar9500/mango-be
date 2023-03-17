import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import {NotesAPIGatewayHandler} from '../../types/notesApiGateway';
import notesMiddleware from '../../middlewares/notesMiddleware';

type GetNotesParams = {
  query?: string;
  archived?: string;
};

type GetNotesLambda = NotesAPIGatewayHandler<unknown, GetNotesParams>;

const getNotes: GetNotesLambda = async ({queryStringParameters, service}) => {
  const _archived = queryStringParameters?.archived;
  const archived = _archived == null ? undefined : _archived === 'true';

  const notes = await service.getNotes({...queryStringParameters, archived});
  return formatJSONResponse(notes);
};

export const main = middyfyLambda(getNotes, {authorized: true}).use(
  notesMiddleware(),
);

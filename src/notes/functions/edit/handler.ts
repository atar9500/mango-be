import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import {NotesAPIGatewayHandler} from '../../types/notesApiGateway';
import Schema from './schema';
import notesMiddleware from '../../middlewares/notesMiddleware';

type EditNoteLambda = NotesAPIGatewayHandler<typeof Schema>;

const editNote: EditNoteLambda = async ({body, service}) => {
  const note = await service.editNote(body);
  return formatJSONResponse(note);
};

export const main = middyfyLambda(editNote, {authorized: true}).use(
  notesMiddleware(),
);

import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import Schema from './schema';
import {NotesAPIGatewayHandler} from '../../types/notesApiGateway';
import notesMiddleware from '../../middlewares/notesMiddleware';

type CreatNoteLambda = NotesAPIGatewayHandler<typeof Schema>;

const createNote: CreatNoteLambda = async ({service, body}) => {
  const note = await service.createNote(body);
  return formatJSONResponse(note);
};

export const main = middyfyLambda(createNote, {authorized: true}).use(
  notesMiddleware(),
);

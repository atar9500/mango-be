import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import {NotesAPIGatewayHandler} from '../../types/notesApiGateway';
import notesMiddleware from '../../middlewares/notesMiddleware';
import Schema from './schema';

type DeleteLambda = NotesAPIGatewayHandler<typeof Schema>;

const deleteNote: DeleteLambda = async ({body, service}) => {
  const id = await service.deleteNote(body);
  return formatJSONResponse({id});
};

export const main = middyfyLambda(deleteNote, {authorized: true}).use(
  notesMiddleware(),
);

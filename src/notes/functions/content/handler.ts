import formatJSONResponse from '~/shared/utils/formatJSONResponse';
import middyfyLambda from '~/shared/middlewares/middyfyLambda';

import {NotesAPIGatewayHandler} from '../../types/notesApiGateway';
import notesMiddleware from '../../middlewares/notesMiddleware';

type GetNoteContentParams = {
  id: string;
};

type GetNoteContentLambda = NotesAPIGatewayHandler<
  unknown,
  GetNoteContentParams
>;

const getNoteContent: GetNoteContentLambda = async ({
  service,
  queryStringParameters,
}) => {
  const content = await service.getNoteContent(queryStringParameters);
  return formatJSONResponse({content});
};

export const main = middyfyLambda(getNoteContent, {authorized: true}).use(
  notesMiddleware(),
);

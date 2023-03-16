import {Middleware} from '~/shared/types/middleware';

import getNotesService from '../services/notesService/notesService';
import {NotesAPIGatewayProxyEvent} from '../types/notesApiGateway';

const notesMiddleware = (): Middleware<NotesAPIGatewayProxyEvent> => ({
  before: async ({event}) => {
    if (!event.user.id) {
      throw Error('NotesMiddleware can be set only on authorized lambdas!');
    }

    event.service = getNotesService(event.user.id);
  },
});

export default notesMiddleware;

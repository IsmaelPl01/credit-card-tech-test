import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';
import {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
} from './controllers/cardController';

admin.initializeApp();

const corsHandler = cors({ origin: true });

export const cards = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const path = req.path.split('/').filter(p => p);
    const method = req.method;

    if (method === 'POST' && path.length === 0) {
      return createCard(req, res);
    }

    if (method === 'GET' && path.length === 0) {
      return getAllCards(req, res);
    }

    if (method === 'GET' && path.length === 1) {
      req.params = { cardId: path[0] };
      return getCardById(req, res);
    }

    if (method === 'PUT' && path.length === 1) {
      req.params = { cardId: path[0] };
      return updateCard(req, res);
    }

    if (method === 'DELETE' && path.length === 1) {
      req.params = { cardId: path[0] };
      return deleteCard(req, res);
    }

    return res.status(404).json({
      error: 'Ruta no encontrada',
      message: `La ruta ${req.path} con método ${method} no existe`,
    });
  });
});

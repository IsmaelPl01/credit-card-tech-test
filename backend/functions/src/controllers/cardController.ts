import { Request, Response } from 'firebase-functions';
import { CardService } from '../services/cardService';
import { validateCardData } from '../validators/cardValidator';

const cardService = new CardService();

export const createCard = async (req: Request, res: Response) => {
  try {
    const validation = validateCardData(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validación fallida',
        details: validation.errors,
      });
    }

    const card = await cardService.createCard(req.body);

    return res.status(201).json({
      message: 'Tarjeta creada exitosamente',
      data: card,
    });
  } catch (error: any) {
    console.error('Error creating card:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await cardService.getAllCards();

    return res.status(200).json({
      message: 'Tarjetas obtenidas exitosamente',
      data: cards,
      count: cards.length,
    });
  } catch (error: any) {
    console.error('Error getting cards:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

export const getCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const card = await cardService.getCardById(cardId);

    if (!card) {
      return res.status(404).json({
        error: 'Tarjeta no encontrada',
        message: `No se encontró una tarjeta con el ID: ${cardId}`,
      });
    }

    return res.status(200).json({
      message: 'Tarjeta obtenida exitosamente',
      data: card,
    });
  } catch (error: any) {
    console.error('Error getting card:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const validation = validateCardData(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validación fallida',
        details: validation.errors,
      });
    }

    const card = await cardService.updateCard(cardId, req.body);

    if (!card) {
      return res.status(404).json({
        error: 'Tarjeta no encontrada',
        message: `No se encontró una tarjeta con el ID: ${cardId}`,
      });
    }

    return res.status(200).json({
      message: 'Tarjeta actualizada exitosamente',
      data: card,
    });
  } catch (error: any) {
    console.error('Error updating card:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    const result = await cardService.deleteCard(cardId);

    if (!result) {
      return res.status(404).json({
        error: 'Tarjeta no encontrada',
        message: `No se encontró una tarjeta con el ID: ${cardId}`,
      });
    }

    return res.status(200).json({
      message: 'Tarjeta eliminada exitosamente',
      data: result,
    });
  } catch (error: any) {
    console.error('Error deleting card:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

import * as admin from 'firebase-admin';
import { maskCardNumber } from '../utils/maskCard';

const db = admin.firestore();
const cardsCollection = db.collection('cards');

export interface CardData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}

export class CardService {
  async createCard(cardData: CardData) {
    const timestamp = admin.firestore.Timestamp.now();
    
    const newCard = {
      ...cardData,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const docRef = await cardsCollection.add(newCard);
    
    return {
      id: docRef.id,
      ...newCard,
      cardNumber: maskCardNumber(newCard.cardNumber),
    };
  }

  async getAllCards() {
    const snapshot = await cardsCollection.orderBy('createdAt', 'desc').get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      cardNumber: maskCardNumber(doc.data().cardNumber),
    }));
  }

  async getCardById(cardId: string) {
    const doc = await cardsCollection.doc(cardId).get();
    
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
      cardNumber: maskCardNumber(doc.data()?.cardNumber || ''),
    };
  }

  async updateCard(cardId: string, cardData: Partial<CardData>) {
    const docRef = cardsCollection.doc(cardId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const timestamp = admin.firestore.Timestamp.now();
    const updatedData = {
      ...cardData,
      updatedAt: timestamp,
    };

    await docRef.update(updatedData);

    const updatedDoc = await docRef.get();
    
    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      cardNumber: maskCardNumber(updatedDoc.data()?.cardNumber || ''),
    };
  }

  async deleteCard(cardId: string) {
    const docRef = cardsCollection.doc(cardId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    await docRef.delete();
    
    return { id: cardId, deleted: true };
  }
}

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Card {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  createdAt: Date;
}

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id' | 'createdAt'>) => void;
  removeCard: (id: string) => void;
  clearForm: () => void;
  loading: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  const addCard = (cardData: Omit<Card, 'id' | 'createdAt'>) => {
    setLoading(true);
    
    setTimeout(() => {
      const newCard: Card = {
        ...cardData,
        id: `card_${Date.now()}`,
        createdAt: new Date(),
      };
      
      setCards([newCard, ...cards]);
      setLoading(false);
    }, 500);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const clearForm = () => {
    //TODO
  };

  return (
    <CardContext.Provider value={{ cards, addCard, removeCard, clearForm, loading }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
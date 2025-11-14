"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addCard: (card: Omit<Card, 'id' | 'createdAt'>) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/credit-card-tech-test/us-central1/cards';

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (response.ok) {
        const formattedCards = data.data.map((card: any) => ({
          ...card,
          createdAt: card.createdAt?.toDate ? card.createdAt.toDate() : new Date(card.createdAt)
        }));
        setCards(formattedCards);
      }
    } catch (err) {
      console.error('Error fetching cards:', err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const addCard = async (cardData: Omit<Card, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la tarjeta');
      }

      await fetchCards();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCard = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la tarjeta');
      }

      setCards(cards.filter(card => card.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContext.Provider value={{ cards, addCard, removeCard, loading, error }}>
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
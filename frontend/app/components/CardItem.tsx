"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '../context/CardContext';

interface CardItemProps {
  card: Card;
  showActions?: boolean;
}

export default function CardItem({ card, showActions = false }: CardItemProps) {
  // Función para enmascarar el número de tarjeta
  const maskCardNumber = (cardNumber: string): string => {
    if (cardNumber.length !== 16) return cardNumber;
    const first2 = cardNumber.slice(0, 2);
    const last4 = cardNumber.slice(-4);
    return `${first2}**********${last4}`;
  };

  return (
    <div className="card-item">
      <div className="card-info">
        <div className="card-number">
          <span className="label">Tarjeta:</span>
          <span className="value">{maskCardNumber(card.cardNumber)}</span>
        </div>
        <div className="card-details">
          <div className="detail">
            <span className="label">Titular:</span>
            <span className="value">{card.cardholderName}</span>
          </div>
          <div className="detail">
            <span className="label">Vence:</span>
            <span className="value">{card.expiryDate}</span>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <span className="card-date">
          {new Date(card.createdAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
        {showActions && (
          <Link href={`/cards/${card.id}`} className="btn-view-details">
            Ver detalles
          </Link>
        )}
      </div>
    </div>
  );
}
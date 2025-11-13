"use client";

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCards } from '../../context/CardContext';
import CardPreview from '../../components/CardPreview';

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { cards, removeCard } = useCards();
  
  const cardId = params.id as string;
  const card = cards.find(c => c.id === cardId);

  if (!card) {
    return (
      <main className="card-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Tarjeta no encontrada</h2>
            <p>La tarjeta que buscas no existe o fue eliminada</p>
            <Link href="/cards" className="btn-back">
              ← Ver todas las tarjetas
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Función para enmascarar el número de tarjeta
  const maskCardNumber = (cardNumber: string): string => {
    if (cardNumber.length !== 16) return cardNumber;
    const first2 = cardNumber.slice(0, 2);
    const last4 = cardNumber.slice(-4);
    return `${first2}**********${last4}`;
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar esta tarjeta?')) {
      removeCard(card.id);
      router.push('/cards');
    }
  };

  return (
    <main className="card-detail-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <div>
              <h1>Detalle de Tarjeta</h1>
              <p>Información completa de la tarjeta</p>
            </div>
            <Link href="/cards" className="btn-back">
              ← Volver a todas
            </Link>
          </div>
        </header>

        <div className="card-detail-content">
          {/* Preview grande de la tarjeta */}
          <div className="card-preview-large">
            <CardPreview
              cardNumber={card.cardNumber}
              cardholderName={card.cardholderName}
              expiryDate={card.expiryDate}
              cvv={card.cvv}
            />
          </div>

          {/* Información detallada */}
          <div className="card-info-detail">
            <h2>Información de la Tarjeta</h2>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Número de Tarjeta</span>
                <span className="info-value">{maskCardNumber(card.cardNumber)}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Titular</span>
                <span className="info-value">{card.cardholderName}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Fecha de Vencimiento</span>
                <span className="info-value">{card.expiryDate}</span>
              </div>

              <div className="info-item">
                <span className="info-label">CVV</span>
                <span className="info-value">***</span>
              </div>

              <div className="info-item">
                <span className="info-label">Fecha de Registro</span>
                <span className="info-value">
                  {new Date(card.createdAt).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">ID de Tarjeta</span>
                <span className="info-value card-id">{card.id}</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="card-detail-actions">
              <button 
                onClick={handleDelete} 
                className="btn-delete"
              >
                Eliminar Tarjeta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
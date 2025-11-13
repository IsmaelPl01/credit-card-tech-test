"use client";

import React from 'react';
import Link from 'next/link';
import CreditCardForm from './components/CreditCardForm';
import CardItem from './components/CardItem';
import { useCards } from './context/CardContext';

export default function HomePage() {
  const { cards } = useCards();
  
  // Mostrar solo las últimas 3 tarjetas
  const recentCards = cards.slice(0, 3);

  return (
    <main className="home-page">
      <div className="container">
        <header className="page-header">
          <h1>Gestión de Tarjetas</h1>
          <p>Agrega y administra tus tarjetas de forma segura</p>
        </header>

        {/* Formulario de agregar tarjeta */}
        <section className="form-section">
          <CreditCardForm />
        </section>

        {/* Tarjetas recientes */}
        {cards.length > 0 && (
          <section className="recent-section">
            <div className="recent-cards-container">
              <div className="recent-cards-header">
                <h2>Tarjetas Recientes</h2>
                {cards.length > 3 && (
                  <Link href="/cards" className="view-all-link">
                    Ver todas ({cards.length})
                  </Link>
                )}
              </div>

              <div className="cards-list">
                {recentCards.map((card) => (
                  <CardItem key={card.id} card={card} showActions={false} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
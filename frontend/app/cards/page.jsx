"use client";

import React from 'react';
import Link from 'next/link';
import CardList from '../components/CardList';

export default function AllCardsPage() {
  return (
    <main className="all-cards-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <div>
              <h1>Todas las Tarjetas</h1>
              <p>Administra y visualiza todas tus tarjetas</p>
            </div>
            <Link href="/" className="btn-back">
              ← Volver al inicio
            </Link>
          </div>
        </header>

        <section className="cards-section">
          <CardList 
            showFilters={true} 
            showPagination={true} 
            itemsPerPage={6}
          />
        </section>
      </div>
    </main>
  );
}
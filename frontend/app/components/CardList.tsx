"use client";

import React, { useState, useMemo } from 'react';
import { useCards } from '../context/CardContext';
import CardItem from './CardItem';

interface CardListProps {
  showFilters?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
}

export default function CardList({ 
  showFilters = true, 
  showPagination = true,
  itemsPerPage = 6 
}: CardListProps) {
  const { cards } = useCards();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar tarjetas por nombre
  const filteredCards = useMemo(() => {
    if (!searchTerm) return cards;
    
    return cards.filter(card =>
      card.cardholderName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cards, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCards = filteredCards.slice(startIndex, endIndex);

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cards.length === 0) {
    return (
      <div className="card-list-empty">
        <p>No hay tarjetas agregadas aún</p>
      </div>
    );
  }

  return (
    <div className="card-list-container">
      {/* Filtro de búsqueda */}
      {showFilters && (
        <div className="card-list-filters">
          <input
            type="text"
            placeholder="Buscar por nombre del titular..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset a página 1 al buscar
            }}
            className="search-input"
          />
          <span className="results-count">
            {filteredCards.length} {filteredCards.length === 1 ? 'tarjeta' : 'tarjetas'}
          </span>
        </div>
      )}

      {/* Lista de tarjetas */}
      {filteredCards.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron tarjetas con ese nombre</p>
        </div>
      ) : (
        <>
          <div className="cards-grid">
            {paginatedCards.map((card) => (
              <CardItem key={card.id} card={card} showActions={true} />
            ))}
          </div>

          {/* Paginación */}
          {showPagination && totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Anterior
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
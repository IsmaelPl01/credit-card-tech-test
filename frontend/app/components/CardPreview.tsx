"use client";

import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

interface CardPreviewProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  focused?: 'number' | 'name' | 'expiry' | 'cvc' | '';
}

export default function CardPreview({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  focused = '',
}: CardPreviewProps) {
  return (
    <div className="card-preview">
      <Cards
        number={cardNumber}
        name={cardholderName}
        expiry={expiryDate}
        cvc={cvv}
        focused={focused}
        placeholders={{ name: 'NOMBRE TITULAR' }}
        locale={{ valid: 'VÁLIDO\nHASTA' }}
      />
    </div>
  );
}

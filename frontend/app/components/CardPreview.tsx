"use client";

import React from 'react';
import Image from 'next/image';

interface CardPreviewProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export default function CardPreview({ cardNumber, cardholderName, expiryDate, cvv }: CardPreviewProps) {
  const formatCardNumber = (number: string) => {
    return number.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim() || '•••• •••• •••• ••••'
  }

  const displayDate = expiryDate || 'MM/YY'

  return (
    <div className="card-preview-container">
      <div className="credit-card">
        <div className="card-header">
          <div className="card-logo">monobank</div>
          <div className="card-divider"></div>
          <div className="card-type">Universal Bank</div>
          <Image 
            src="/contactless.svg" 
            alt="Contactless" 
            width={30} 
            height={30}
            className="card-contactless"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
          <div></div>
          <div style={{ fontSize: '9px', opacity: 0.5 }}>world</div>
        </div>
        
        <Image 
          src="/chip.png" 
          alt="chip" 
          width={56} 
          height={44}
          className="card-chip"
        />
         
        <div className="card-number">
          {formatCardNumber(cardNumber)}
        </div>

        <div className="card-footer">
          <div className="card-footer-left">
            <div className="card-expiry-row">
              <span className="card-expiry-label">VALID THRU</span>
              <span className="card-expiry-value">{displayDate}</span>
            </div>
          </div>

          <div className="card-footer-right">
            <div className="card-logo-payment">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="Mastercard Logo"
                className="mastercard"
              />
            </div>
          </div>
        </div>

        <div className="card-name-row">
          {cardholderName ? cardholderName.toUpperCase() : 'CARDHOLDER NAME'}
        </div>
      </div>
    </div>
  );
}

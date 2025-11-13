import { useState, useEffect } from 'react';

interface ValidationErrors {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
}

export const useCardValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateCardNumber = (value: string): string | undefined => {
    if (!value) return 'El número de tarjeta es requerido';
    if (!/^\d+$/.test(value)) return 'Solo se permiten números';
    if (value.length !== 16) return 'Debe tener 16 dígitos';
    return undefined;
  };

  const validateCardholderName = (value: string): string | undefined => {
    if (!value) return 'El nombre del titular es requerido';
    if (!/^[a-záéíóúñü\s]+$/i.test(value)) {
      return 'Solo se permiten letras y letdes';
    }
    if (value.length > 20) return 'Máximo 20 caracteres';
    return undefined;
  };

  const validateExpiryDate = (value: string): string | undefined => {
    if (!value) return 'La fecha de vencimiento es requerida';
    
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!regex.test(value)) return 'Formato inválido (MM/YY)';
    
    const [month, year] = value.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    if (monthNum < 1 || monthNum > 12) {
      return 'Mes inválido (01-12)';
    }
    
    const currentYear = new Date().getFullYear() % 100;
    const maxYear = currentYear + 5;
    
    if (yearNum < 22) {
      return 'Año inválido (mínimo 22)';
    }
    
    if (yearNum > maxYear) {
      return `Año inválido (máximo ${maxYear})`;
    }
    
    return undefined;
  };

  const validateCVV = (value: string): string | undefined => {
    if (!value) return 'El CVV es requerido';
    if (!/^\d+$/.test(value)) return 'Solo se permiten números';
    if (value.length < 3 || value.length > 4) {
      return 'Debe tener 3 o 4 dígitos';
    }
    return undefined;
  };

  const validateAll = (data: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  }): { isValid: boolean; errors: ValidationErrors } => {
    const newErrors: ValidationErrors = {
      cardNumber: validateCardNumber(data.cardNumber),
      cardholderName: validateCardholderName(data.cardholderName),
      expiryDate: validateExpiryDate(data.expiryDate),
      cvv: validateCVV(data.cvv),
    };

    const filteredErrors = Object.entries(newErrors).reduce((acc, [key, value]) => {
      if (value) acc[key as keyof ValidationErrors] = value;
      return acc;
    }, {} as ValidationErrors);

    setErrors(filteredErrors);

    return {
      isValid: Object.keys(filteredErrors).length === 0,
      errors: filteredErrors,
    };
  };

  return {
    errors,
    setErrors,
    validateCardNumber,
    validateCardholderName,
    validateExpiryDate,
    validateCVV,
    validateAll,
  };
};
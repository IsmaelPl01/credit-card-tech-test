interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateCardData = (data: any): ValidationResult => {
  const errors: { [key: string]: string } = {};

  if (!data.cardNumber) {
    errors.cardNumber = 'El número de tarjeta es requerido';
  } else if (!/^\d{16}$/.test(data.cardNumber)) {
    errors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
  }

  if (!data.cardholderName) {
    errors.cardholderName = 'El nombre del titular es requerido';
  } else if (!/^[a-záéíóúñü\s]+$/i.test(data.cardholderName)) {
    errors.cardholderName = 'El nombre solo puede contener letras';
  } else if (data.cardholderName.length > 20) {
    errors.cardholderName = 'El nombre no puede exceder 20 caracteres';
  }

  if (!data.expiryDate) {
    errors.expiryDate = 'La fecha de vencimiento es requerida';
  } else {
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!expiryRegex.test(data.expiryDate)) {
      errors.expiryDate = 'La fecha debe tener formato MM/YY';
    } else {
      const [month, year] = data.expiryDate.split('/');
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      
      if (monthNum < 1 || monthNum > 12) {
        errors.expiryDate = 'Mes inválido (01-12)';
      }
      
      const currentYear = new Date().getFullYear() % 100;
      const maxYear = currentYear + 5;
      
      if (yearNum < 22 || yearNum > maxYear) {
        errors.expiryDate = `Año inválido (22-${maxYear})`;
      }
    }
  }

  if (!data.cvv) {
    errors.cvv = 'El CVV es requerido';
  } else if (!/^\d{3,4}$/.test(data.cvv)) {
    errors.cvv = 'El CVV debe tener 3 o 4 dígitos';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

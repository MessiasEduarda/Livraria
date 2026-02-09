// Tipos de erro
export type ValidationError = {
  field: 'clientName' | 'clientEmail' | 'clientPhone' | 'clientCPF' | 'cart' | 'discount' | 'total' | 'seller' | 'general';
  message: string;
};

// Validação de nome do cliente
export function validateClientName(name: string): ValidationError | null {
  if (!name || name.trim() === '') {
    return {
      field: 'clientName',
      message: 'Por favor, insira o nome do cliente'
    };
  }

  if (name.trim().length < 3) {
    return {
      field: 'clientName',
      message: 'O nome deve ter no mínimo 3 caracteres'
    };
  }

  return null;
}

// Validação de email do cliente
export function validateClientEmail(email: string): ValidationError | null {
  // Email é opcional, então só valida se foi preenchido
  if (email && email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        field: 'clientEmail',
        message: 'Digite um email válido'
      };
    }
  }

  return null;
}

// Validação de telefone do cliente
export function validateClientPhone(phone: string): ValidationError | null {
  if (!phone || phone.trim() === '') {
    return {
      field: 'clientPhone',
      message: 'Por favor, insira o telefone do cliente'
    };
  }

  const phoneNumbers = phone.replace(/\D/g, '');
  if (phoneNumbers.length < 10) {
    return {
      field: 'clientPhone',
      message: 'Digite um telefone válido com DDD'
    };
  }

  return null;
}

// Validação de CPF do cliente
export function validateClientCPF(cpf: string): ValidationError | null {
  if (!cpf || cpf.trim() === '') {
    return {
      field: 'clientCPF',
      message: 'Por favor, insira o CPF do cliente'
    };
  }

  const cpfNumbers = cpf.replace(/\D/g, '');
  if (cpfNumbers.length !== 11) {
    return {
      field: 'clientCPF',
      message: 'Digite um CPF válido com 11 dígitos'
    };
  }

  return null;
}

// Validação do carrinho
export function validateCart(cartLength: number): ValidationError | null {
  if (cartLength === 0) {
    return {
      field: 'cart',
      message: 'Adicione ao menos um produto ao carrinho'
    };
  }

  return null;
}

// Validação de desconto
export function validateDiscount(discount: string, subtotal: number): ValidationError | null {
  const discountValue = parseFloat(discount) || 0;

  if (discountValue < 0) {
    return {
      field: 'discount',
      message: 'O desconto não pode ser negativo'
    };
  }

  if (discountValue > subtotal) {
    return {
      field: 'discount',
      message: `O desconto não pode ser maior que o subtotal (R$ ${subtotal.toFixed(2)})`
    };
  }

  return null;
}

// Validação do total
export function validateTotal(total: number): ValidationError | null {
  if (total <= 0) {
    return {
      field: 'total',
      message: 'O valor total deve ser maior que zero'
    };
  }

  return null;
}

// Validação do vendedor
export function validateSeller(sellerId: number | null): ValidationError | null {
  if (!sellerId) {
    return {
      field: 'seller',
      message: 'Por favor, selecione o vendedor responsável pela venda'
    };
  }

  return null;
}

// Validação completa do formulário de venda
export function validateSaleForm(data: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCPF: string;
  cartLength: number;
  discount: string;
  subtotal: number;
  total: number;
  sellerId: number | null;
}): ValidationError | null {
  const cartError = validateCart(data.cartLength);
  if (cartError) return cartError;

  const nameError = validateClientName(data.clientName);
  if (nameError) return nameError;

  const phoneError = validateClientPhone(data.clientPhone);
  if (phoneError) return phoneError;

  const cpfError = validateClientCPF(data.clientCPF);
  if (cpfError) return cpfError;

  const emailError = validateClientEmail(data.clientEmail);
  if (emailError) return emailError;

  const discountError = validateDiscount(data.discount, data.subtotal);
  if (discountError) return discountError;

  const totalError = validateTotal(data.total);
  if (totalError) return totalError;

  const sellerError = validateSeller(data.sellerId);
  if (sellerError) return sellerError;

  return null;
}

export const ERROR_MESSAGES = {
  CLIENT_NAME_REQUIRED: 'Por favor, insira o nome do cliente',
  CLIENT_NAME_MIN_LENGTH: 'O nome deve ter no mínimo 3 caracteres',
  CLIENT_EMAIL_INVALID: 'Digite um email válido',
  CLIENT_PHONE_REQUIRED: 'Por favor, insira o telefone do cliente',
  CLIENT_PHONE_INVALID: 'Digite um telefone válido com DDD',
  CLIENT_CPF_REQUIRED: 'Por favor, insira o CPF do cliente',
  CLIENT_CPF_INVALID: 'Digite um CPF válido com 11 dígitos',
  CART_EMPTY: 'Adicione ao menos um produto ao carrinho',
  DISCOUNT_NEGATIVE: 'O desconto não pode ser negativo',
  DISCOUNT_EXCEEDS_SUBTOTAL: 'O desconto não pode ser maior que o subtotal',
  TOTAL_INVALID: 'O valor total deve ser maior que zero',
  SELLER_REQUIRED: 'Por favor, selecione o vendedor responsável pela venda',
};
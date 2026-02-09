// Tipos de erro
export type ValidationError = {
  field: 'name' | 'email' | 'phone' | 'cpf' | 'endereco' | 'cidade' | 'estado' | 'cep' | 'category' | 'general';
  message: string;
};

// Validação de nome
export function validateName(name: string): ValidationError | null {
  if (!name || name.trim() === '') {
    return {
      field: 'name',
      message: 'Por favor, insira o nome completo do cliente'
    };
  }

  if (name.trim().length < 3) {
    return {
      field: 'name',
      message: 'O nome deve ter no mínimo 3 caracteres'
    };
  }

  return null;
}

// Validação de email
export function validateEmail(email: string): ValidationError | null {
  if (!email || email.trim() === '') {
    return {
      field: 'email',
      message: 'Por favor, insira o email do cliente'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      field: 'email',
      message: 'Digite um email válido. Exemplo: cliente@email.com'
    };
  }

  return null;
}

// Validação de telefone
export function validatePhone(phone: string): ValidationError | null {
  if (!phone || phone.trim() === '') {
    return {
      field: 'phone',
      message: 'Por favor, insira o telefone do cliente'
    };
  }

  const phoneNumbers = phone.replace(/\D/g, '');
  if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
    return {
      field: 'phone',
      message: 'Digite um telefone válido com DDD'
    };
  }

  return null;
}

// Validação de CPF
export function validateCPF(cpf: string): ValidationError | null {
  if (!cpf || cpf.trim() === '') {
    return {
      field: 'cpf',
      message: 'Por favor, insira o CPF do cliente'
    };
  }

  const cpfNumbers = cpf.replace(/\D/g, '');
  if (cpfNumbers.length !== 11) {
    return {
      field: 'cpf',
      message: 'Digite um CPF válido com 11 dígitos'
    };
  }

  return null;
}

// Validação de endereço
export function validateEndereco(endereco: string): ValidationError | null {
  if (!endereco || endereco.trim() === '') {
    return {
      field: 'endereco',
      message: 'Por favor, insira o endereço do cliente'
    };
  }

  if (endereco.trim().length < 5) {
    return {
      field: 'endereco',
      message: 'Digite um endereço completo com rua e número'
    };
  }

  return null;
}

// Validação de cidade
export function validateCidade(cidade: string): ValidationError | null {
  if (!cidade || cidade.trim() === '') {
    return {
      field: 'cidade',
      message: 'Por favor, insira a cidade do cliente'
    };
  }

  if (cidade.trim().length < 3) {
    return {
      field: 'cidade',
      message: 'Digite um nome de cidade válido'
    };
  }

  return null;
}

// Validação de estado
export function validateEstado(estado: string): ValidationError | null {
  if (!estado || estado.trim() === '') {
    return {
      field: 'estado',
      message: 'Por favor, selecione o estado do cliente'
    };
  }

  return null;
}

// Validação de CEP
export function validateCEP(cep: string): ValidationError | null {
  if (!cep || cep.trim() === '') {
    return {
      field: 'cep',
      message: 'Por favor, insira o CEP do cliente'
    };
  }

  const cepNumbers = cep.replace(/\D/g, '');
  if (cepNumbers.length !== 8) {
    return {
      field: 'cep',
      message: 'Digite um CEP válido com 8 dígitos'
    };
  }

  return null;
}

// Validação de categoria
export function validateCategory(category: string): ValidationError | null {
  if (!category || category.trim() === '') {
    return {
      field: 'category',
      message: 'Por favor, selecione uma categoria de interesse'
    };
  }

  return null;
}

// Validação completa do formulário
export function validateClientForm(data: {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  category: string;
}): ValidationError | null {
  const nameError = validateName(data.name);
  if (nameError) return nameError;

  const emailError = validateEmail(data.email);
  if (emailError) return emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) return phoneError;

  const cpfError = validateCPF(data.cpf);
  if (cpfError) return cpfError;

  const enderecoError = validateEndereco(data.endereco);
  if (enderecoError) return enderecoError;

  const cidadeError = validateCidade(data.cidade);
  if (cidadeError) return cidadeError;

  const estadoError = validateEstado(data.estado);
  if (estadoError) return estadoError;

  const cepError = validateCEP(data.cep);
  if (cepError) return cepError;

  const categoryError = validateCategory(data.category);
  if (categoryError) return categoryError;

  return null;
}

export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Por favor, insira o nome completo do cliente',
  NAME_MIN_LENGTH: 'O nome deve ter no mínimo 3 caracteres',
  EMAIL_REQUIRED: 'Por favor, insira o email do cliente',
  EMAIL_INVALID: 'Digite um email válido. Exemplo: cliente@email.com',
  PHONE_REQUIRED: 'Por favor, insira o telefone do cliente',
  PHONE_INVALID: 'Digite um telefone válido com DDD',
  CPF_REQUIRED: 'Por favor, insira o CPF do cliente',
  CPF_INVALID: 'Digite um CPF válido com 11 dígitos',
  ENDERECO_REQUIRED: 'Por favor, insira o endereço do cliente',
  ENDERECO_INVALID: 'Digite um endereço completo com rua e número',
  CIDADE_REQUIRED: 'Por favor, insira a cidade do cliente',
  CIDADE_INVALID: 'Digite um nome de cidade válido',
  ESTADO_REQUIRED: 'Por favor, selecione o estado do cliente',
  CEP_REQUIRED: 'Por favor, insira o CEP do cliente',
  CEP_INVALID: 'Digite um CEP válido com 8 dígitos',
  CATEGORY_REQUIRED: 'Por favor, selecione uma categoria de interesse',
};
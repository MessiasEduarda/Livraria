// Tipos de erro
export type ValidationError = {
  field: 'email' | 'password' | 'general';
  message: string;
};

// Regex para validação de email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validação de email
export function validateEmail(email: string): ValidationError | null {
  if (!email || email.trim() === '') {
    return {
      field: 'email',
      message: 'Por favor, insira seu e-mail'
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      field: 'email',
      message: 'E-mail inválido. Verifique o formato'
    };
  }

  return null;
}

// Validação de senha
export function validatePassword(password: string): ValidationError | null {
  if (!password || password.trim() === '') {
    return {
      field: 'password',
      message: 'Por favor, insira sua senha'
    };
  }

  if (password.length < 8) {
    return {
      field: 'password',
      message: 'A senha deve ter no mínimo 8 caracteres'
    };
  }

  return null;
}

// Validação de credenciais
export function validateCredentials(
  email: string,
  password: string
): ValidationError | null {
  // Primeiro valida os campos individualmente
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  // Credenciais são validadas pela API (admin e vendedores)
  return null;
}

// Mensagens de erro específicas
export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Por favor, insira seu e-mail',
  EMAIL_INVALID: 'E-mail inválido. Verifique o formato',
  EMAIL_NOT_FOUND: 'E-mail não encontrado no sistema',
  PASSWORD_REQUIRED: 'Por favor, insira sua senha',
  PASSWORD_MIN_LENGTH: 'A senha deve ter no mínimo 8 caracteres',
  PASSWORD_INCORRECT: 'Senha incorreta. Tente novamente',
  CREDENTIALS_INVALID: 'E-mail ou senha incorretos. Apenas administradores podem acessar.',
  UNAUTHORIZED: 'Acesso negado. Você não tem permissão para acessar esta área.',
  USER_NOT_FOUND: 'Usuário não encontrado. Verifique suas credenciais',
};

// ... seu código existente ...

// Tipo para erros que devem abrir modal
export type ModalErrorType = 'CREDENTIALS_INVALID' | 'UNAUTHORIZED' | 'USER_NOT_FOUND';

// Verifica se o erro deve abrir modal
export function shouldShowModal(error: ValidationError | null): boolean {
  if (!error) return false;
  
  const modalErrors = [
    ERROR_MESSAGES.CREDENTIALS_INVALID,
    ERROR_MESSAGES.UNAUTHORIZED,
    ERROR_MESSAGES.USER_NOT_FOUND
  ];
  
  return modalErrors.includes(error.message);
}

// Função para obter título do modal baseado na mensagem
export function getModalTitle(message: string): string {
  if (message === ERROR_MESSAGES.CREDENTIALS_INVALID) {
    return 'Login inválido!';
  }
  if (message === ERROR_MESSAGES.UNAUTHORIZED) {
    return 'Acesso negado!';
  }
  if (message === ERROR_MESSAGES.USER_NOT_FOUND) {
    return 'Usuário não encontrado!';
  }
  return 'Erro!';
}
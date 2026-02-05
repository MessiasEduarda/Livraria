// Tipos de erro
export type ValidationError = {
  field: 'email' | 'password' | 'general';
  message: string;
};

// Regex para validação de email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Credenciais do admin
export const ADMIN_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: '12345678'
};

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

  // Verifica se as credenciais correspondem ao admin
  if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
    return {
      field: 'password',
      message: 'E-mail ou senha incorretos. Apenas administradores podem acessar.'
    };
  }

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
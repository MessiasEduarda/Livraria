'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './styles';
import { 
  validateEmail, 
  validatePassword, 
  validateCredentials, 
  ValidationError,
  shouldShowModal,
  getModalTitle
} from './validation';
import ErrorModal from '@/components/modals/errorModal';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados de erro
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  
  // Estados para controlar se o campo foi tocado
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Estados do modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Limpa todos os erros
  function clearAllErrors() {
    setEmailError('');
    setPasswordError('');
  }

  // Valida email em tempo real (só após o campo ser tocado)
  function handleEmailBlur() {
    setEmailTouched(true);
    if (email.trim()) {
      const error = validateEmail(email);
      setEmailError(error ? error.message : '');
    }
  }

  // Valida senha em tempo real (só após o campo ser tocado)
  function handlePasswordBlur() {
    setPasswordTouched(true);
    if (password.trim()) {
      const error = validatePassword(password);
      setPasswordError(error ? error.message : '');
    }
  }

  // Atualiza email e limpa erro se houver
  function handleEmailChange(value: string) {
    setEmail(value);
    if (emailTouched) {
      setEmailError('');
    }
  }

  // Atualiza senha e limpa erro se houver
  function handlePasswordChange(value: string) {
    setPassword(value);
    if (passwordTouched) {
      setPasswordError('');
    }
  }

  // Fecha o modal
  function handleCloseModal() {
    setModalOpen(false);
  }

  // Submete o formulário
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    setEmailTouched(true);
    setPasswordTouched(true);
    
    // Limpa erros anteriores
    clearAllErrors();

    // Valida as credenciais
    const validationError = validateCredentials(email, password);

    if (validationError) {
      // Verifica se deve mostrar modal
      if (shouldShowModal(validationError)) {
        setModalTitle(getModalTitle(validationError.message));
        setModalMessage(validationError.message);
        setModalOpen(true);
      } else {
        // Define o erro no campo apropriado
        if (validationError.field === 'email') {
          setEmailError(validationError.message);
        } else if (validationError.field === 'password') {
          setPasswordError(validationError.message);
        }
      }
      return;
    }

    // Se passou na validação, faz o login
    setLoading(true);

    setTimeout(() => {
      router.push('/home');
    }, 1000);
  }

  return (
    <>
      <S.Container>
        <S.LeftPanel>
          <S.PatternOverlay />
        </S.LeftPanel>

        <S.RightPanel>
          <S.FormWrapper>
            <S.LogoWrapper>
              <S.LogoImg 
                src="/logo.png" 
                alt="Logo Livraria"
              />
            </S.LogoWrapper>

            <S.Title>Entre Capítulos</S.Title>
            <S.Subtitle>Área do administrador</S.Subtitle>

            <S.Form onSubmit={handleLogin}>
              {/* Campo de E-mail */}
              <S.InputGroup>
                <S.Label htmlFor="email">E-mail</S.Label>
                <S.InputWrapper>
                  <S.Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    disabled={loading}
                    $hasError={!!emailError}
                  />
                </S.InputWrapper>
                {emailError && (
                  <S.FieldError>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {emailError}
                  </S.FieldError>
                )}
              </S.InputGroup>

              {/* Campo de Senha */}
              <S.InputGroup>
                <S.Label htmlFor="password">Senha</S.Label>
                <S.InputWrapper>
                  <S.Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={handlePasswordBlur}
                    disabled={loading}
                    $hasError={!!passwordError}
                  />
                  <S.TogglePassword 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </S.TogglePassword>
                </S.InputWrapper>
                {passwordError && (
                  <S.FieldError>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {passwordError}
                  </S.FieldError>
                )}
              </S.InputGroup>

              <S.SubmitButton type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <S.Spinner />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </S.SubmitButton>
            </S.Form>
          </S.FormWrapper>
        </S.RightPanel>
      </S.Container>

      {/* Modal de Erro */}
      <ErrorModal
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
}
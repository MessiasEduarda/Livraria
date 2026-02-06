import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  width: 55%;
  background-image: url('/fundo1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  @media (max-width: 968px) {
    width: 100%;
    min-height: 250px;
  }
`;

export const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.08;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);
`;

export const RightPanel = styled.div`
  width: 50%;
  background-color: #1b1b1b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;

  @media (max-width: 968px) {
    width: 100%;
    padding: 60px 30px;
  }

  @media (max-width: 576px) {
    padding: 50px 25px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  margin-top: -5rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
`;

export const LogoImg = styled.img`
  width: 300px;
  height: auto;
  max-width: 100%;
  object-fit: contain;

  @media (max-width: 576px) {
    width: 220px;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: -110px 0 4px 0;
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.5px;

  @media (max-width: 576px) {
    font-size: 1.7rem;
  }
`;

export const Subtitle = styled.p`
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #9ca3af;
  margin: 0 0 40px 0;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 576px) {
    font-size: 0.95rem;
    margin-bottom: 35px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #d1d5db;
  letter-spacing: 0.2px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 52px;
  padding: 0 20px;
  border: 2px solid ${props => props.$hasError ? '#ab031d' : '#2d2d2d'};
  border-radius: 1000px;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #ffffff;
  background-color: #252525;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#0b4200'};
    background-color: #2a2a2a;
  }

  &::placeholder {
    color: #5a5a5a;
    font-size: 0.92rem;
  }

  &:disabled {
    background-color: #222222;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: #ffffff;
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px #252525;
  }
`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 18px;
  background: none;
  border: none;
  color: #71c700;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover:not(:disabled) {
    color: #71c700;
  }

  &:focus {
    outline: none;
    color: #71c700;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const FieldError = styled.div`
  padding: 8px 12px;
  background-color:transparent;
  border-left: 3px solid #ab031d;
  border-radius: 8px;
  color: #ff5c77;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  animation: ${fadeInDown} 0.3s ease;

  svg {
    flex-shrink: 0;
  }
`;

export const SubmitButton = styled.button`
  height: 52px;
  margin-top: 16px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, #71c700 0%, #71c700 100%);
  color: #161616;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(165, 255, 46, 0.35);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5da500 0%, #5da500 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(165, 255, 46, 0.45);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(11, 66, 0, 0.3);
  border-top-color: #0b4200;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
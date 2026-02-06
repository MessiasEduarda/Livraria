import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.25s ease;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 450px;
  min-height: 240px;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    max-width: 95%;
  }
`;

export const Header = styled.div`
  background: linear-gradient(135deg, #f57c00 0%, #ef6c00 100%);
  padding: 20px 20px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.3px;
  text-align: left;

  @media (max-width: 576px) {
    font-size: 1.4rem;
  }
`;

export const Content = styled.div`
  padding: 32px 20px;
  background-color: #ffffff;
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

export const Message = styled.p`
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #757575;
  margin: 0;
  line-height: 1.6;
  text-align: left;
  margin-top: -1rem;

  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

export const Footer = styled.div`
  padding: 0;
  background-color: #ffffff;
  border-top: 1px solid #d0d0d0;
  display: flex;
  flex-shrink: 0;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 56px;
  border: none;
  border-radius: 0;
  background-color: #ffffff;
  color: #757575;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-right: 1px solid #d0d0d0;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #eeeeee;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
    height: 52px;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 56px;
  border: none;
  border-radius: 0;
  background-color: #ffffff;
  color: #f57c00;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fff3e0;
  }

  &:active {
    background-color: #ffe0b2;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
    height: 52px;
  }
`;
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.25s ease;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  min-height: 200px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    max-width: 95%;
  }
`;

export const Header = styled.div`
  padding: 20px 20px;
  background: linear-gradient(135deg, #3CAD8C 0%, #2e8f72 100%);
  flex-shrink: 0;
`;

export const Title = styled.h2`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-align: left;
  letter-spacing: -0.02em;

  @media (max-width: 576px) {
    font-size: 1.15rem;
  }
`;

export const Content = styled.div`
  padding: 28px 20px;
  background-color: #ffffff;
  flex: 1;
`;

export const Subtitle = styled.p`
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #374151;
  margin: 0;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

export const ContentWithTitle = styled.div`
  padding: 28px 20px;
  background-color: #ffffff;
`;

export const Message = styled.p`
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
  text-align: left;
`;

export const MessageAsTitle = styled.p`
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
`;

export const Footer = styled.div`
  padding: 0;
  background-color: #ffffff;
  border-top: 1px solid #d0d0d0;
  display: flex;
  flex-shrink: 0;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 0 0 16px 16px;
  background-color: #fff3e0;
  color: #3CAD8C;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  @media (max-width: 576px) {
    height: 52px;
    font-size: 0.95rem;
  }
`;

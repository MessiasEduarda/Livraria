import styled from 'styled-components';

export const PageContainer = styled.div`
  margin-left: 231px;
  width: calc(100% - 231px);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const EmpresasBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
`;

export const EmpresasContent = styled.div`
  padding: 40px;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    padding: 24px 20px;
    margin-top: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #3CAD8C;
  margin: 0;
  font-weight: 600;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  margin-left: 18rem;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: slideUp 0.3s ease;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  transition: all 0.2s ease;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 28px;
  flex: 1;
  overflow: hidden;
`;

export const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  height: 100%;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EmpresaPlaceholder = styled.div`
  width: 100%;
  height: 280px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(60, 173, 140, 0.15);
  color: #3CAD8C;

  svg {
    width: 120px;
    height: 120px;
    opacity: 0.8;
  }
`;

export const InfoBox = styled.div`
  background: linear-gradient(135deg, #3CAD8C 0%, #2e8f72 100%);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

export const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;
`;

export const EmpresaNameText = styled.h2`
  font-size: 2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
  line-height: 1.3;
  margin-left: 0.8rem;
`;

export const EmpresaEmailText = styled.p`
  font-size: 1.1rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
  line-height: 1.5;
  margin-left: 0.8rem;
`;

export const DescriptionSection = styled.div`
  margin: 12px 0;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 10px;
`;

export const DescriptionTitle = styled.h3`
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const DescriptionText = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #555;
  line-height: 1.5;
  margin: 0;
`;

export const DetailsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const DetailLabel = styled.span`
  font-size: 0.7rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  font-weight: 600;
`;

export const StatusBox = styled.div<{ $ativo: boolean }>`
  background-color: ${(p) => (p.$ativo ? '#d1e7dd' : '#f8d7da')};
  padding: 16px;
  border-radius: 10px;
  text-align: center;
`;

export const StatusLabel = styled.div`
  font-size: 0.85rem;
  color: #333;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatusValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #0f5132;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 28px;
  border-top: 1px solid #f0f0f0;
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const BackButton = styled.button`
  padding: 12px 28px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  color: #333;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
`;

export const EditButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  background-color: #3CAD8C;
  color: white;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a8569;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(60, 173, 140, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 24px;

  h1 {
    font-size: 2rem;
    font-family: var(--font-cabourg-bold), 'Cabourg', serif;
    color: #333;
  }
`;

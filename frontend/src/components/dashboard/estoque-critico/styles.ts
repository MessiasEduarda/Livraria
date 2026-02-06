import styled from 'styled-components';

export const PageContainer = styled.div`
  margin-left: 231px;
  width: calc(100% - 231px);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const DashboardBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
`;

export const DashboardContent = styled.div`
  padding: 40px;
  margin-top: 3rem;
`;

export const Header = styled.div`
  margin-bottom: 36px;
  padding-bottom: 20px;
  border-bottom: 2px solid #dee2e6;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #3CAD8C;
  margin: 0 0 8px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

export const DateRange = styled.p`
  font-size: 1rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 36px;
`;

export const StatCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  display: flex;
  gap: 20px;
  border: 1px solid #f3f4f6;
`;

export const StatIcon = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${props => `linear-gradient(135deg, ${props.$color}20, ${props.$color}10)`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: ${props => props.$color};
  }
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const StatLabel = styled.span`
  font-size: 0.8rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const StatValue = styled.div`
  font-size: 1.875rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
`;

export const StatTrend = styled.span<{ $positive: boolean }>`
  font-size: 0.8rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: ${props => props.$positive ? '#059669' : '#dc2626'};
  font-weight: 600;
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 36px;
`;

export const ChartsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ChartCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  border: 1px solid #f3f4f6;
  height: 200px;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  margin: 0;
  font-weight: 700;
`;

export const ChartPeriod = styled.span`
  font-size: 0.875rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  font-weight: 500;
`;

export const ActivitySection = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  border: 1px solid #f3f4f6;
`;

export const ActivityHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
`;

export const ActivityTitle = styled.h3`
  font-size: 1.25rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  margin: 0;
  font-weight: 700;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActivityItem = styled.div<{ $type: string }>`
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
`;

export const ActivityIcon = styled.div<{ $type: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: #6b7280;
  }
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActivityText = styled.p`
  font-size: 0.925rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #1f2937;
  margin: 0;
  font-weight: 600;
`;

export const ActivityTime = styled.span`
  font-size: 0.8rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #9ca3af;
  font-weight: 500;
`;

export const AlertsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 36px;
`;

export const AlertCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AlertIconWrapper = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${props => `${props.$color}20`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: ${props => props.$color};
  }
`;

export const AlertContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AlertTitle = styled.h4`
  font-size: 1.125rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  margin: 0;
  font-weight: 700;
`;

export const AlertDescription = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
`;

export const AlertAction = styled.button<{ $color: string }>`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: ${props => props.$color};
  color: white;
  font-size: 0.875rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 700;
  cursor: pointer;
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
  cursor: pointer;
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(1, 255, 179, 0.07);
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1001;
  margin-left: 15rem;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 1024px) {
    margin-left: 0;
    max-width: 90%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #111827;
  margin: 0;
  font-weight: 700;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.2s ease;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:hover {
    color: #374151;
    background-color: #f3f4f6;
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 32px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;

    &:hover {
      background: #9ca3af;
    }
  }
`;

export const StockWarning = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #fee2e220, #fef3c720);
  border: 1px solid #fcd34d;
  border-radius: 16px;
  margin-bottom: 28px;

  svg {
    color: #d97706;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  div {
    font-size: 1rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #92400e;
    line-height: 1.6;
    font-weight: 500;

    strong {
      font-weight: 700;
      color: #78350f;
    }
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f3f4f6, #ffffff);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px -4px rgba(1, 255, 179, 0.07);
    border-color: #d1d5db;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProductName = styled.div`
  font-size: 1.125rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const ProductCategory = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  font-weight: 500;
`;

export const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const StockLevel = styled.div<{ $critical?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  .current {
    font-size: 1.25rem;
    font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
    font-weight: 700;
    color: ${props => props.$critical ? '#dc2626' : '#059669'};
  }

  .minimum {
    font-size: 0.8rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #6b7280;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background-color: #3CAD8C;
  color: white;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: #2a8569;
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -2px rgba(1, 255, 179, 0.07);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px 32px;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const CloseButton = styled.button`
  padding: 12px 28px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: white;
  color: #374151;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
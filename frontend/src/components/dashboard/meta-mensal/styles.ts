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

  @media (max-width: 1024px) {
    padding: 24px 20px;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    margin-top: 1.5rem;
  }

  @media (max-width: 576px) {
    padding: 16px 12px;
    margin-top: 1rem;
  }
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
  max-height: 68vh;
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

export const ProgressSection = styled.div`
  margin-bottom: 28px;
`;

export const ProgressInfo = styled.div`
  margin-bottom: 16px;
`;

export const ProgressLabel = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProgressValue = styled.div`
  font-size: 1.875rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #111827;
  font-weight: 700;

  span {
    font-size: 1.125rem;
    color: #6b7280;
    font-weight: 500;
  }
`;

export const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 36px;
  background: #f3f4f6;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(1, 255, 179, 0.07);
`;

export const ProgressBar = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${props => props.$percentage}%;
  background: linear-gradient(90deg, #3CAD8C, #005f41);
  border-radius: 18px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

export const ProgressPercentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

export const StatsGridModal = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px -2px rgba(1, 255, 179, 0.07);
    border-color: #d1d5db;
  }
`;

export const StatItemLabel = styled.div`
  font-size: 0.8rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatItemValue = styled.div<{ $color?: string }>`
  font-size: 1.375rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: ${props => props.$color || '#111827'};
  font-weight: 700;
`;

export const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #dbeafe20, #eff6ff20);
  border: 1px solid #bfdbfe;
  border-radius: 16px;
  margin-bottom: 28px;
`;

export const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(1, 255, 179, 0.07);

  svg {
    color: #2563eb;
  }
`;

export const InfoText = styled.div`
  font-size: 1rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #1e40af;
  line-height: 1.6;
  font-weight: 500;
`;

export const TimelineSection = styled.div`
  margin-top: 32px;
`;

export const TimelineTitle = styled.h3`
  font-size: 1.125rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  margin: 0 0 24px 0;
  font-weight: 700;
`;

export const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const TimelineItem = styled.div<{ $completed: boolean }>`
  display: flex;
  gap: 16px;
  padding-bottom: 28px;
  position: relative;
  opacity: ${props => props.$completed ? 1 : 0.65};

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 30px;
    bottom: 0;
    width: 2px;
    background: ${props => props.$completed ? '#3CAD8C' : '#d1d5db'};
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export const TimelineDot = styled.div<{ $completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.$completed ? '#3CAD8C' : 'white'};
  border: 3px solid ${props => props.$completed ? '#3CAD8C' : '#d1d5db'};
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  box-shadow: ${props => props.$completed ? '0 0 0 4px rgba(1, 255, 179, 0.07)' : 'none'};

  ${props => props.$completed && `
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
    }
  `}
`;

export const TimelineContent = styled.div`
  padding-top: 2px;
  flex: 1;
`;

export const TimelineDate = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const TimelineDescription = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.5;
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
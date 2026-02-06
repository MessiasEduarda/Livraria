import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 231px;
  padding: 40px;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
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

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  display: flex;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f3f4f6;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3CAD8C, #2563eb, #7c3aed, #059669);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 25px -5px rgba(1, 255, 179, 0.07), 0 10px 10px -5px rgba(1, 255, 179, 0.07);
    border-color: #e5e7eb;

    &::before {
      opacity: 1;
    }
  }
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
  transition: all 0.3s ease;

  svg {
    color: ${props => props.$color};
    transition: transform 0.3s ease;
  }

  ${StatCard}:hover & {
    transform: scale(1.05);
    
    svg {
      transform: scale(1.1);
    }
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1600px) {
    font-size: 1.625rem;
  }
`;

export const StatTrend = styled.span<{ $positive: boolean }>`
  font-size: 0.8rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: ${props => props.$positive ? '#059669' : '#dc2626'};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${props => props.$positive ? '#d1fae520' : '#fee2e220'};
  border-radius: 6px;
  width: fit-content;

  &::before {
    content: '${props => props.$positive ? '↗' : '↘'}';
    font-size: 1rem;
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 36px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
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
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(1, 255, 179, 0.07), 0 4px 6px -2px rgba(1, 255, 179, 0.07);
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
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
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 8px;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 320px;
`;

export const ActivitySection = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  border: 1px solid #f3f4f6;
  height: fit-content;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(1, 255, 179, 0.07), 0 4px 6px -2px rgba(1, 255, 179, 0.07);
  }
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
  background: ${props => {
    switch(props.$type) {
      case 'sale': return 'linear-gradient(135deg, #d1fae520, #d1fae510)';
      case 'stock': return 'linear-gradient(135deg, #fef3c720, #fef3c710)';
      case 'customer': return 'linear-gradient(135deg, #dbeafe20, #dbeafe10)';
      case 'report': return 'linear-gradient(135deg, #ede9fe20, #ede9fe10)';
      default: return 'linear-gradient(135deg, #f3f4f620, #f3f4f610)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$type) {
      case 'sale': return '#d1fae5';
      case 'stock': return '#fef3c7';
      case 'customer': return '#dbeafe';
      case 'report': return '#ede9fe';
      default: return '#f3f4f6';
    }
  }};
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(6px);
    box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07);
  }
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
  box-shadow: 0 2px 4px rgba(1, 255, 179, 0.07);

  svg {
    color: ${props => {
      switch(props.$type) {
        case 'sale': return '#3CAD8C';
        case 'stock': return '#d97706';
        case 'customer': return '#2563eb';
        case 'report': return '#7c3aed';
        default: return '#6b7280';
      }
    }};
  }
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`;

export const ActivityText = styled.p`
  font-size: 0.925rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #1f2937;
  margin: 0;
  font-weight: 600;
  line-height: 1.4;
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

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
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
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 25px -5px rgba(1, 255, 179, 0.07), 0 10px 10px -5px rgba(1, 255, 179, 0.07);
  }
`;

export const AlertIconWrapper = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${props => `linear-gradient(135deg, ${props.$color}20, ${props.$color}10)`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 4px;

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
  align-self: flex-start;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: ${props => props.$color};
  color: white;
  font-size: 0.875rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(1, 255, 179, 0.07);

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(1, 255, 179, 0.07);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TopProductsCard = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(1, 255, 179, 0.07), 0 4px 6px -2px rgba(1, 255, 179, 0.07);
  }
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  border: 1px solid #f3f4f6;
  margin-bottom: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f3f4f6, #ffffff);
    transform: translateX(6px);
    box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07);
    border-color: #e5e7eb;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductRank = styled.div<{ $rank: number }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => {
    if (props.$rank === 1) return 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
    if (props.$rank === 2) return 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)';
    if (props.$rank === 3) return 'linear-gradient(135deg, #cd7f32 0%, #d4a574 100%)';
    return 'linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 800;
  font-size: 1.05rem;
  color: ${props => props.$rank <= 3 ? '#1f2937' : '#6b7280'};
  flex-shrink: 0;
  box-shadow: ${props => props.$rank <= 3 ? '0 4px 6px -1px rgba(1, 255, 179, 0.07)' : 'none'};
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const ProductName = styled.div`
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductCategory = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  font-weight: 500;
`;

export const ProductStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const ProductSales = styled.div`
  font-size: 0.875rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #6b7280;
  font-weight: 600;
`;

export const ProductRevenue = styled.div`
  font-size: 1.125rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #3CAD8C;
  font-weight: 800;
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

export const QuickActionCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(1, 255, 179, 0.07), 0 2px 4px -1px rgba(1, 255, 179, 0.07);
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #3CAD8C, #2563eb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 25px -5px rgba(1, 255, 179, 0.07), 0 10px 10px -5px rgba(1, 255, 179, 0.07);
    border-color: #e5e7eb;

    &::before {
      opacity: 1;
    }
  }
`;

export const QuickActionIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => `linear-gradient(135deg, ${props.$color}20, ${props.$color}10)`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  svg {
    color: ${props => props.$color};
    transition: transform 0.3s ease;
  }

  ${QuickActionCard}:hover & {
    transform: scale(1.1);
    
    svg {
      transform: rotate(5deg) scale(1.1);
    }
  }
`;

export const QuickActionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const QuickActionTitle = styled.h4`
  font-size: 1.0625rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #111827;
  margin: 0;
  font-weight: 700;
`;

export const QuickActionDescription = styled.p`
  font-size: 0.875rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
`;
// styles.ts (arquivo completo)
import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 231px;
  padding: 40px;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  margin-top: 3rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 2rem;
  color: #0b4200;
  margin: 0;
  font-weight: 600;
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
  background: white;
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ViewButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$active ? '#0b4200' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$active ? '#002e10' : '#f5f5f5'};
  }

  svg {
    stroke: ${props => props.$active ? 'white' : '#666'};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 14px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div<{ $color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: ${props => props.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
    stroke: ${props => props.$color};
  }
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1600px) {
    font-size: 1.35rem;
  }
`;

export const StatTrend = styled.span<{ $positive: boolean }>`
  font-size: 0.75rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: ${props => props.$positive ? '#059669' : '#dc2626'};
  font-weight: 500;
`;

export const QuickFilters = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const QuickFilterButton = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border: 1px solid ${props => props.$active ? '#0b4200' : '#ddd'};
  border-radius: 50px;
  background-color: ${props => props.$active ? '#0b4200' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0b4200;
    background-color: ${props => props.$active ? '#002e10' : '#f8f9fa'};
  }
`;

export const FilterSection = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #333;
`;

export const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  span {
    color: #666;
    font-size: 0.9rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  }
`;

export const DateInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  transition: all 0.3s ease;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const CategoryOption = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.$active ? '#0b4200' : '#ddd'};
  border-radius: 20px;
  background-color: ${props => props.$active ? '#0b4200' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 0.85rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0b4200;
    background-color: ${props => props.$active ? '#002e10' : '#f8f9fa'};
  }
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  z-index: 2;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  background-color: white;
  color: #333;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  align-self: flex-end;
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background-color: #0b4200;
  color: white;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #002e10;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 66, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  color: #333;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
`;

export const SalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

export const SaleCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #0b4200;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const SaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

export const SaleId = styled.div`
  font-size: 1.1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 700;
  color: #0b4200;
`;

export const SaleDate = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
`;

export const SaleItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px 0;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 10px;
`;

export const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const ItemName = styled.span`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
`;

export const ItemQuantity = styled.span`
  font-size: 0.8rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
`;

export const ItemPrice = styled.span`
  font-size: 0.95rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
`;

export const SaleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

export const TotalLabel = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
  margin-bottom: 4px;
`;

export const TotalValue = styled.div`
  font-size: 1.5rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-weight: 700;
  color: #0b4200;
`;

export const SaleStatus = styled.div<{ $status: 'completed' | 'pending' | 'cancelled' }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${props => {
    if (props.$status === 'completed') return '#d1f4e0';
    if (props.$status === 'pending') return '#fff3cd';
    return '#f8d7da';
  }};
  color: ${props => {
    if (props.$status === 'completed') return '#0f5132';
    if (props.$status === 'pending') return '#856404';
    return '#721c24';
  }};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: #999;

  svg {
    margin-bottom: 24px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    font-family: var(--font-cabourg-bold), 'Cabourg', serif;
    color: #333;
    margin: 0 0 12px 0;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #666;
    margin: 0;
  }
`;

export const TimelineView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TimelineGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimelineDate = styled.div`
  font-size: 1.2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-weight: 600;
  color: #0b4200;
  padding-bottom: 12px;
  border-bottom: 2px solid #0b4200;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 16px;
    height: 16px;
    background-color: #0b4200;
    border-radius: 50%;
    border: 3px solid #f5f5f5;
  }
`;

export const TimelineCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-left: 32px;
  padding-left: 24px;
  border-left: 2px dashed #ddd;
`;
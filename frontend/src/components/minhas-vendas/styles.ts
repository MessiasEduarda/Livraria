import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 231px;
  padding: 40px;
  width: calc(100% - 231px);
  max-width: calc(100% - 231px);
  min-height: 100vh;
  background-color: #f5f5f5;
  margin-top: 3rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    max-width: 100%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 2rem;
  color: #3CAD8C;
  margin: 0;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #666;
  margin: 4px 0 0 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
  min-width: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
  min-width: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;

export const StatIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${(p) => p.$color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
    stroke: ${(p) => p.$color};
  }
`;

export const StatContent = styled.div`
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
`;

export const FilterSection = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 28px;
`;

export const FilterTitle = styled.h3`
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 1rem;
  color: #333;
  margin: 0 0 16px 0;
`;

export const QuickFilters = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const QuickFilterButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: 1px solid ${(p) => (p.$active ? '#3CAD8C' : '#ddd')};
  border-radius: 50px;
  background-color: ${(p) => (p.$active ? '#3CAD8C' : 'white')};
  color: ${(p) => (p.$active ? 'white' : '#333')};
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3CAD8C;
    background-color: ${(p) => (p.$active ? '#2a8569' : '#f8f9fa')};
    color: ${(p) => (p.$active ? 'white' : '#333')};
  }
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

export const DateInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3CAD8C;
  }
`;

export const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  min-width: 140px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3CAD8C;
  }
`;

export const SalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 24px;
  min-width: 0;
`;

export const SaleCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-left: 4px solid #3CAD8C;
  min-width: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const SaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SaleId = styled.span`
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 0.9rem;
  color: #3CAD8C;
`;

export const SaleDate = styled.span`
  font-size: 0.8rem;
  color: #666;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
`;

export const SaleItems = styled.div`
  margin: 12px 0;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

export const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
  margin-bottom: 4px;
`;

export const ItemInfo = styled.span`
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
`;

export const ItemName = styled.span`
  font-weight: 500;
`;

export const ItemQuantity = styled.span`
  color: #666;
  margin-left: 6px;
`;

export const ItemPrice = styled.span`
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #333;
`;

export const SaleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

export const TotalLabel = styled.span`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #333;
`;

export const TotalValue = styled.span`
  font-size: 1.1rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-weight: 700;
  color: #3CAD8C;
`;

export const SaleStatus = styled.span<{ $status: string }>`
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${(p) =>
    p.$status === 'completed' ? '#d1fae5' : p.$status === 'cancelled' ? '#fee2e2' : '#fef3c7'};
  color: ${(p) =>
    p.$status === 'completed' ? '#059669' : p.$status === 'cancelled' ? '#dc2626' : '#d97706'};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const EmptyTitle = styled.p`
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 8px 0;
`;

export const EmptyText = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin: 0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 10px 16px;
  border: 1px solid ${(p) => (p.$active ? '#3CAD8C' : '#ddd')};
  border-radius: 10px;
  background: ${(p) => (p.$active ? '#3CAD8C' : 'white')};
  color: ${(p) => (p.$active ? 'white' : '#333')};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #3CAD8C;
    background: ${(p) => (p.$active ? '#2a8569' : '#f8f9fa')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

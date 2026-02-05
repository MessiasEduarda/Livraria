import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 231px;
  padding: 40px;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #0b4200;
  margin: 0;
  font-weight: 600;
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
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
  border-radius: 50px;
  font-size: 0.95rem;
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

export const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${props => props.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: ${props => props.$color};
  }
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatLabel = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 1.30rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #1a1a1a;
  font-weight: 700;
  line-height: 1;
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
    background-color: ${props => props.$active ? '#002e10' : '#f8fdf5'};
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const FilterDropdown = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 50px;
  background-color: white;
  color: #333;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:hover {
    border-color: #0b4200;
    background-color: #f8fdf5;
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

export const FilterList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FilterOption = styled.div<{ $active?: boolean }>`
  padding: 12px 20px;
  color: ${props => props.$active ? '#0b4200' : '#333'};
  font-weight: ${props => props.$active ? '600' : '400'};
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  background-color: ${props => props.$active ? '#e8f5e0' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #f8fdf5;
    color: #0b4200;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #dc3545;
  border-radius: 50px;
  background-color: white;
  color: #dc3545;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dc3545;
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: none;
  border-radius: 50px;
  background-color: #0b4200;
  color: white;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(11, 66, 0, 0.2);

  &:hover {
    background-color: #002e10;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 66, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ClientsTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const TableHeader = styled.thead`
  background-color: #0b4200;
  color: white;
`;

export const TableRow = styled.tr<{ $isHeader?: boolean }>`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  ${props => !props.$isHeader && `
    &:hover {
      background-color: #fafafa;
    }
  `}

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeaderCell = styled.th<{ $width?: string }>`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: ${props => props.$width || 'auto'};
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  vertical-align: middle;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
`;

export const ClientDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ClientAvatar = styled.div<{ $status: 'active' | 'inactive' | 'vip' }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => {
    if (props.$status === 'vip') return 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
    if (props.$status === 'active') return 'linear-gradient(135deg, #0b4200 0%, #28a745 100%)';
    return 'linear-gradient(135deg, #999 0%, #ccc 100%)';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${props => props.$status === 'inactive' ? '#333' : 'white'};
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const ClientName = styled.div`
  font-weight: 600;
  font-family: var(--font-cabourg-regular), 'Cabourg', serif;
  color: #1a1a1a;
  margin-bottom: 4px;
  font-size: 0.95rem;
`;

export const ClientEmail = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
`;

export const ClientPhone = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #333;
  font-weight: 500;
`;

export const StatusBadge = styled.div<{ $status: 'active' | 'inactive' | 'vip' }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  white-space: nowrap;
  background-color: ${props => {
    if (props.$status === 'vip') return '#fff3cd';
    if (props.$status === 'active') return '#d1e7dd';
    return '#f8d7da';
  }};
  color: ${props => {
    if (props.$status === 'vip') return '#856404';
    if (props.$status === 'active') return '#0f5132';
    return '#721c24';
  }};
`;

export const PurchaseCount = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #333;
  font-weight: 600;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ActionButton = styled.button`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0b4200;
    border-color: #0b4200;
    color: white;
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: #999;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  z-index: 1001;
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
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid #f0f0f0;
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
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
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

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  color: #333;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 28px;
  border-top: 1px solid #f0f0f0;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
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

export const SubmitButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  background-color: #0b4200;
  color: white;
  font-size: 0.95rem;
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
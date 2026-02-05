import styled from 'styled-components';

export const PageContainer = styled.div`
  margin-left: 231px;
  width: calc(100% - 231px);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const EstoqueBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
`;

export const EstoqueContent = styled.div`
  padding: 40px;
  margin-top: 3rem;
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
  color: #0b4200;
  margin: 0;
  font-weight: 600;
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
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
  background-color: white;
  color: #333;

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
  min-width: 200px;
`;

export const BooksTable = styled.table`
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

export const BookDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BookImage = styled.img`
  width: 60px;
  height: 85px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

export const BookTitle = styled.div`
  font-weight: 600;
  font-family: var(--font-cabourg-regular), 'Cabourg', serif;
  color: #1a1a1a;
  margin-bottom: 4px;
  font-size: 0.95rem;
`;

export const BookAuthor = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background-color: #353536;
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PriceTag = styled.div`
  font-weight: 700;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #1a1a1a;
  font-size: 1.1rem;
`;

export const StockBadge = styled.div<{ $status: 'low' | 'medium' | 'high' }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  white-space: nowrap;
  background-color: ${props => {
    if (props.$status === 'low') return '#fff3cd';
    if (props.$status === 'medium') return '#cfe2ff';
    return '#d1e7dd';
  }};
  color: ${props => {
    if (props.$status === 'low') return '#856404';
    if (props.$status === 'medium') return '#084298';
    return '#0f5132';
  }};
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
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
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
  margin-bottom: 20px;
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

export const ImageUpload = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: #0b4200;
    background-color: #f8fdf5;
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
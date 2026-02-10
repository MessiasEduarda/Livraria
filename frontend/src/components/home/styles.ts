import styled, { keyframes } from 'styled-components';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    gap: 16px;
    flex-direction: column;
    align-items: stretch;
  }

  @media (max-width: 576px) {
    margin-bottom: 20px;
    gap: 12px;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 2rem;
  color: #3CAD8C;
  margin: 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
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
    border-color: #3CAD8C;
    box-shadow: 0 0 0 3px rgba(101, 0, 217, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 16px;
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
    border-color: #3CAD8C;
    background-color: #faf8ff;
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
  color: ${props => props.$active ? '#3CAD8C' : '#333'};
  font-weight: ${props => props.$active ? '600' : '400'};
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  background-color: ${props => props.$active ? '#f3e8ff' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: #faf8ff;
    color: #3CAD8C;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const EsgotadosFilterButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border: 1px solid ${props => props.$active ? '#3CAD8C' : '#ddd'};
  border-radius: 50px;
  background-color: ${props => props.$active ? '#e8f5f3' : 'white'};
  color: ${props => props.$active ? '#2a8569' : '#333'};
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3CAD8C;
    background-color: #e8f5f3;
    color: #2a8569;
  }
`;

export const ClearFilter = styled.button`
  padding: 10px 24px;
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
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: none;
  border-radius: 50px;
  background-color: #3CAD8C;
  color: white;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(101, 0, 217, 0.2);

  &:hover {
    background-color: #2a8569;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(1, 255, 179, 0.07);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    gap: 16px;
    margin-top: 20px;
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    margin-top: 16px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const BookCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(8, 73, 54, 0.07);
  }
`;

export const BookCover = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #e0e0e0;
`;

export const BookCoverPlaceholder = styled.div`
  width: 100%;
  height: 180px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.9rem;
`;

export const BookInfo = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BookCategory = styled.span`
  display: inline-block;
  padding: 5px 12px;
  background-color: #353536;
  color: white;
  border-radius: 20px;
  font-size: 0.7rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

export const BookTitle = styled.h3`
  font-size: 1.1rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  font-weight: 600;
  line-height: 1.3;
`;

export const BookAuthor = styled.p`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0 0 12px 0;
  font-weight: 400;
`;

export const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`;

export const BookPrice = styled.p`
  font-size: 1.3rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #1a1a1a;
  margin: 0;
  font-weight: 700;
`;

export const StockBadge = styled.div<{ $status: 'low' | 'medium' | 'high' }>`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 500;
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

export const BookActions = styled.div`
  display: flex;
  gap: 4px;
  margin-top: auto;
  padding-top: 12px;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  font-size: 0.75rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.$primary ? '#3CAD8C' : '#f5f5f5'};
  color: ${props => props.$primary ? 'white' : '#333'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(1, 255, 179, 0.07);
    background-color: ${props => props.$primary ? '#2a8569' : '#e0e0e0'};
  }

  &:active {
    transform: translateY(0);
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
    color: #3CAD8C;
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 28px;
  min-height: 540px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

/** Container para o dropdown Categoria no Adicionar livro – largura reduzida */
export const CategoryDropdownWrap = styled.div`
  max-width: 220px;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ab031d' : '#ddd'};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  color: #333;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(171, 3, 29, 0.1)' : 'rgba(1, 255, 179, 0.07)'};
  }

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ab031d' : '#ddd'};
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  color: #333;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(171, 3, 29, 0.1)' : 'rgba(101, 0, 217, 0.1)'};
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
    border-color: #3CAD8C;
    background-color: #faf8ff;
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
  background-color: #3CAD8C;
  color: white;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3CAD8C;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(101, 0, 217, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FieldError = styled.div`
  padding: 8px 12px;
  background-color: transparent;
  border-left: 3px solid #ab031d;
  border-radius: 8px;
  color: #ff5c77;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  animation: ${fadeInDown} 0.3s ease;

  svg {
    flex-shrink: 0;
  }
`;
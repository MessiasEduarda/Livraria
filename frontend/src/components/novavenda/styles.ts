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
`;

export const Title = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 2rem;
  color: #3CAD8C;
  margin: 0;
  font-weight: 600;
`;

export const Badge = styled.div`
  padding: 10px 24px;
  background: linear-gradient(135deg, #3CAD8C 0%, #2a8569 100%);
  color: white;
  border-radius: 50px;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(60, 173, 140, 0.3);
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;  // Layout de 2 colunas
  gap: 24px;
  width: 100%;;

  @media (max-width: 1024px) {  // Mudado de 1400px para 1024px
    grid-template-columns: 1fr;  // Só muda para 1 coluna em telas pequenas
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightPanel = styled.div`
  position: sticky;
  top: 100px;
  height: fit-content;
  min-width: 450px;  // NOVO: garante largura mínima

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    min-width: auto;
  }
`;

export const Section = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  border-radius: 1000px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  color: #333;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(171, 3, 29, 0.1)' : 'rgba(60, 173, 140, 0.1)'};
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
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
    border-color: #3CAD8C;
    box-shadow: 0 0 0 3px rgba(60, 173, 140, 0.1);
  }
`;

export const SellerDropdown = styled.div`
  position: relative;
`;

export const SellerButton = styled.button<{ $hasError?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ab031d' : '#ddd'};
  border-radius: 1000px;
  background-color: white;
  color: #333;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    background-color: ${props => props.$hasError ? '#fff5f5' : '#f8fdf5'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(171, 3, 29, 0.1)' : 'rgba(60, 173, 140, 0.1)'};
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
`;

export const SellerList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
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

export const SellerOption = styled.div<{ $active?: boolean }>`
  padding: 12px 16px;
  color: ${props => props.$active ? '#3CAD8C' : '#333'};
  font-weight: ${props => props.$active ? '600' : '400'};
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  background-color: ${props => props.$active ? '#e8f5e0' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background-color: #f8fdf5;
    color: #3CAD8C;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  margin-bottom: 20px;
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
  border-radius: 1000px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  background-color: white;
  color: #333;

  &:focus {
    outline: none;
    border-color: #3CAD8C;
    box-shadow: 0 0 0 3px rgba(60, 173, 140, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #3CAD8C;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const ProductCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    border-color: #3CAD8C;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  background-color: #e0e0e0;
`;

export const ProductInfo = styled.div`
  padding: 12px;
`;

export const ProductName = styled.h3`
  font-size: 0.9rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.6em;
`;

export const ProductAuthor = styled.p`
  font-size: 0.75rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductPrice = styled.div`
  font-size: 1rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #3CAD8C;
  margin: 8px 0;
  font-weight: 700;
`;

export const ProductStock = styled.div<{ $lowStock: boolean }>`
  font-size: 0.75rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: ${props => props.$lowStock ? '#dc2626' : '#059669'};
  margin-bottom: 10px;
  font-weight: 600;
`;

export const AddButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: #3CAD8C;
  color: white;
  font-size: 0.8rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #2a8569;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CartSection = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CartHeader = styled.div`
  background: linear-gradient(135deg, #3CAD8C 0%, #2a8569 100%);
  padding: 20px 24px;
  color: white;

  h2 {
    color: white;
    margin: 0;
  }
`;

export const CartItems = styled.div`
  max-height: 350px;
  overflow-y: auto;
  padding: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #3CAD8C;
    border-radius: 10px;
  }
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #3CAD8C;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 85px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ItemName = styled.div`
  font-size: 0.9rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  font-weight: 600;
  line-height: 1.3;
`;

export const ItemPrice = styled.div`
  font-size: 0.8rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #3CAD8C;
  border-radius: 6px;
  background-color: white;
  color: #3CAD8C;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #3CAD8C;
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const QuantityDisplay = styled.div`
  width: 40px;
  text-align: center;
  font-size: 0.95rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #dc2626;
  border-radius: 8px;
  background-color: white;
  color: #dc2626;
  font-size: 0.75rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dc2626;
    color: white;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PaymentMethod = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 12px;
`;

export const PaymentOption = styled.button<{ $active: boolean }>`
  padding: 12px;
  border: 2px solid ${props => props.$active ? '#3CAD8C' : '#ddd'};
  border-radius: 10px;
  background-color: ${props => props.$active ? '#e8f5e0' : 'white'};
  color: ${props => props.$active ? '#3CAD8C' : '#666'};
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3CAD8C;
    background-color: ${props => props.$active ? '#e8f5e0' : '#f8fdf5'};
  }
`;

export const DiscountInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ab031d' : '#ddd'};
  border-radius: 1000px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  color: #333;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(171, 3, 29, 0.1)' : 'rgba(60, 173, 140, 0.1)'};
  }
`;

export const Notes = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  transition: all 0.3s ease;
  color: #333;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3CAD8C;
    box-shadow: 0 0 0 3px rgba(60, 173, 140, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const CartSummary = styled.div`
  padding: 20px 24px;
  border-top: 2px dashed #e0e0e0;
  background-color: #f8f9fa;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SummaryLabel = styled.div`
  font-size: 0.95rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
  font-weight: 500;
`;

export const SummaryValue = styled.div<{ $discount?: boolean }>`
  font-size: 1rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: ${props => props.$discount ? '#dc2626' : '#1a1a1a'};
  font-weight: 600;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 2px solid #3CAD8C;
`;

export const TotalLabel = styled.div`
  font-size: 1.1rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  font-weight: 700;
`;

export const TotalValue = styled.div`
  font-size: 1.8rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #3CAD8C;
  font-weight: 700;
`;

export const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  padding: 20px 24px;
  background-color: white;
`;

export const CancelButton = styled.button`
  padding: 14px 24px;
  border: 2px solid #dc2626;
  border-radius: 10px;
  background-color: white;
  color: #dc2626;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dc2626;
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FinishButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #3CAD8C 0%, #2a8569 100%);
  color: white;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(60, 173, 140, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(60, 173, 140, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyCart = styled.div`
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
    font-size: 1.3rem;
    font-family: var(--font-cabourg-bold), 'Cabourg', serif;
    color: #333;
    margin: 0 0 12px 0;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #666;
    margin: 0;
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
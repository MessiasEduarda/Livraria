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

export const HomeBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  filter: blur(8px);
  pointer-events: none;
  user-select: none;
`;

export const HomeContent = styled.div`
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

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
  flex-wrap: wrap;
`;

export const HomeTitle = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 2rem;
  color: #3CAD8C;
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
  min-width: 200px;
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
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  margin-top: 24px;
`;

export const BookCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

export const BookCover = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  background-color: #e0e0e0;
`;

export const BookInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BookCategory = styled.span`
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
  margin-bottom: 12px;
  align-self: flex-start;
`;

export const BookTitle = styled.h3`
  font-size: 1.25rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-weight: 600;
  line-height: 1.4;
`;

export const BookAuthor = styled.p`
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0 0 16px 0;
  font-weight: 400;
`;

export const BookPrice = styled.p`
  font-size: 1.5rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #1a1a1a;
  margin: 0;
  font-weight: 700;
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
  animation: slideUp 0.3s ease;
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

export const BookCoverImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const PriceBox = styled.div`
  background: linear-gradient(135deg, #3CAD8C, #3CAD8C 100%);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

export const PriceLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(2, 2, 2, 0.8);
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PriceValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2e2e2e;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  background-color: #353536;
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
`;

export const BookTitleText = styled.h2`
  font-size: 2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
`;

export const BookAuthorText = styled.p`
  font-size: 1.1rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
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

export const StockBox = styled.div<{ $status: 'available' | 'unavailable' }>`
  background-color: ${props => props.$status === 'available' ? '#d1e7dd' : '#f8d7da'};
  padding: 16px;
  border-radius: 10px;
  text-align: center;
`;

export const StockLabel = styled.div`
  font-size: 0.85rem;
  color: #333;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StockValue = styled.div`
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
    box-shadow: 0 4px 12px rgba(1, 255, 179, 0.07);
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
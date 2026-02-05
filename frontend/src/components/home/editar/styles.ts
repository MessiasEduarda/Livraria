import styled from 'styled-components';

export const PageContainer = styled.div`
  margin-left: 231px;
  width: calc(100% - 231px);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
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
  background-color: #0b4200;
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  z-index: 1001;
  margin-left: 16rem;


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

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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
  padding-top: 20px;
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

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &:hover {
      background-color: #999;
      transform: none;
    }
  }
`;
'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import {
  PageContainer,
  HomeBackground,
  HomeContent,
  HomeHeader,
  HomeTitle,
  SearchBar,
  SearchInput,
  SearchIcon,
  FilterSection,
  FilterDropdown,
  FilterButton,
  AddButton,
  BooksGrid,
  BookCard,
  BookCover as GridBookCover,
  BookInfo,
  BookTitle as GridBookTitle,
  BookAuthor as GridBookAuthor,
  BookPrice as GridBookPrice,
  BookCategory as GridBookCategory,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ContentLayout,
  LeftColumn,
  RightColumn,
  BookCoverImage,
  PriceBox,
  PriceLabel,
  PriceValue,
  CategoryBadge,
  BookTitleText,
  BookAuthorText,
  DescriptionSection,
  DescriptionTitle,
  DescriptionText,
  DetailsRow,
  DetailItem,
  DetailLabel,
  DetailValue,
  StockBox,
  StockLabel,
  StockValue,
  ModalFooter,
  BackButton,
  EditButton,
  NotFound
} from './styles';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  cover: string;
  stock: number;
}

const booksData: Book[] = [
  { id: 1, title: "1984", author: "George Orwell", price: 45.90, category: "Ficção", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", stock: 12 },
  { id: 2, title: "Clean Code", author: "Robert Martin", price: 89.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", stock: 8 },
  { id: 3, title: "O Hobbit", author: "J.R.R. Tolkien", price: 52.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", stock: 15 },
  { id: 4, title: "Sapiens", author: "Yuval Harari", price: 64.90, category: "História", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop", stock: 20 },
  { id: 5, title: "O Poder do Hábito", author: "Charles Duhigg", price: 42.90, category: "Autoajuda", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", stock: 10 },
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", price: 58.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1618836850461-81b3a1969e30?w=400&h=600&fit=crop", stock: 25 },
  { id: 7, title: "A Arte da Guerra", author: "Sun Tzu", price: 35.90, category: "Filosofia", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", stock: 18 },
  { id: 8, title: "Algoritmos", author: "Thomas Cormen", price: 125.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop", stock: 5 },
];

export default function DetalhesComponent() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string);
  
  const book = booksData.find(b => b.id === bookId);

  const handleClose = () => {
    router.push('/home');
  };

  const handleEdit = () => {
    router.push(`/home/editar/${bookId}`);
  };

  if (!book) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Livro não encontrado</h1>
            <BackButton onClick={handleClose}>
              Voltar para Home
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <PageContainer>
        {/* Background da Home desfocado */}
        <HomeBackground>
          <HomeContent>
            <HomeHeader>
              <HomeTitle>Gerenciamento de Livraria</HomeTitle>
              <SearchBar>
                <SearchIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </SearchIcon>
                <SearchInput 
                  type="text" 
                  placeholder="Buscar por título ou autor..."
                  disabled
                />
              </SearchBar>
            </HomeHeader>

            <FilterSection>
              <FilterDropdown>
                <FilterButton disabled>
                  <span>Categoria</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </FilterButton>
              </FilterDropdown>

              <AddButton disabled>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Adicionar Livro
              </AddButton>
            </FilterSection>

            <BooksGrid>
              {booksData.slice(0, 6).map(b => (
                <BookCard key={b.id}>
                  <GridBookCover src={b.cover} alt={b.title} />
                  <BookInfo>
                    <GridBookCategory>{b.category}</GridBookCategory>
                    <GridBookTitle>{b.title}</GridBookTitle>
                    <GridBookAuthor>{b.author}</GridBookAuthor>
                    <GridBookPrice>R$ {b.price.toFixed(2)}</GridBookPrice>
                  </BookInfo>
                </BookCard>
              ))}
            </BooksGrid>
          </HomeContent>
        </HomeBackground>

        {/* Modal de Detalhes */}
        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Detalhes do Livro</ModalTitle>
              <ModalClose onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              <ContentLayout>
                {/* Coluna Esquerda - Imagem e Preço */}
                <LeftColumn>
                  <BookCoverImage src={book.cover} alt={book.title} />
                  <PriceBox>
                    <PriceLabel>Preço</PriceLabel>
                    <PriceValue>R$ {book.price.toFixed(2)}</PriceValue>
                  </PriceBox>
                </LeftColumn>

                {/* Coluna Direita - Informações */}
                <RightColumn>
                  <CategoryBadge>{book.category}</CategoryBadge>
                  <BookTitleText>{book.title}</BookTitleText>
                  <BookAuthorText>por {book.author}</BookAuthorText>

                  <DescriptionSection>
                    <DescriptionTitle>Descrição</DescriptionTitle>
                    <DescriptionText>
                      Este é um livro excepcional da categoria {book.category}. Uma obra imperdível escrita por {book.author}.
                    </DescriptionText>
                  </DescriptionSection>

                  <DetailsRow>
                    <DetailItem>
                      <DetailLabel>Categoria</DetailLabel>
                      <DetailValue>{book.category}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Autor</DetailLabel>
                      <DetailValue>{book.author}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>ID</DetailLabel>
                      <DetailValue>#{book.id}</DetailValue>
                    </DetailItem>
                  </DetailsRow>

                  <StockBox $status={book.stock > 0 ? 'available' : 'unavailable'}>
                    <StockLabel>Estoque</StockLabel>
                    <StockValue>
                      {book.stock > 0 ? `${book.stock} unidades disponíveis` : 'Esgotado'}
                    </StockValue>
                  </StockBox>
                </RightColumn>
              </ContentLayout>
            </ModalBody>

            <ModalFooter>
              <BackButton onClick={handleClose}>
                Voltar
              </BackButton>
              <EditButton onClick={handleEdit}>
                Editar Livro
              </EditButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}
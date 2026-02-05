'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import {
  PageContainer,
  EstoqueBackground,
  EstoqueContent,
  Header,
  Title,
  SearchBar,
  SearchInput,
  SearchIcon,
  StatsCards,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  FilterSection,
  FilterGroup,
  FilterDropdown,
  FilterButton,
  BooksTable,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  BookDetails as TableBookDetails,
  BookImage as TableBookImage,
  BookTitle as TableBookTitle,
  BookAuthor as TableBookAuthor,
  CategoryBadge as TableCategoryBadge,
  PriceTag,
  StockBadge as TableStockBadge,
  ActionButtons,
  ActionButton,
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

const inventoryBooks: Book[] = [
  { id: 1, title: "1984", author: "George Orwell", price: 45.90, category: "Ficção", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", stock: 12 },
  { id: 2, title: "Clean Code", author: "Robert Martin", price: 89.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", stock: 8 },
  { id: 3, title: "O Hobbit", author: "J.R.R. Tolkien", price: 52.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", stock: 15 },
  { id: 4, title: "Sapiens", author: "Yuval Harari", price: 64.90, category: "História", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop", stock: 20 },
  { id: 5, title: "O Poder do Hábito", author: "Charles Duhigg", price: 42.90, category: "Autoajuda", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", stock: 10 },
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", price: 58.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1618836850461-81b3a1969e30?w=400&h=600&fit=crop", stock: 25 },
  { id: 7, title: "A Arte da Guerra", author: "Sun Tzu", price: 35.90, category: "Filosofia", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", stock: 18 },
  { id: 8, title: "Algoritmos", author: "Thomas Cormen", price: 125.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop", stock: 5 },
  { id: 9, title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", price: 78.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", stock: 3 },
  { id: 10, title: "Python para Dados", author: "Wes McKinney", price: 95.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", stock: 22 },
  { id: 11, title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", price: 29.90, category: "Ficção", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", stock: 30 },
  { id: 12, title: "Mindset", author: "Carol Dweck", price: 48.90, category: "Autoajuda", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", stock: 7 },
];

export default function DetalhesEstoqueComponent() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string);
  
  const book = inventoryBooks.find(b => b.id === bookId);

  const handleClose = () => {
    router.push('/estoque');
  };

  const handleEdit = () => {
    router.push(`/estoque/editar/${bookId}`);
  };

  const getStockStatus = (stock: number): 'low' | 'medium' | 'high' => {
    if (stock < 10) return 'low';
    if (stock <= 20) return 'medium';
    return 'high';
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  if (!book) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Livro não encontrado</h1>
            <BackButton onClick={handleClose}>
              Voltar para Estoque
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  const totalBooks = inventoryBooks.length;
  const lowStockBooks = inventoryBooks.filter(b => b.stock < 10).length;
  const totalStockValue = inventoryBooks.reduce((acc, book) => acc + (book.price * book.stock), 0);
  const totalItems = inventoryBooks.reduce((acc, book) => acc + book.stock, 0);

  return (
    <Navbar>
      <PageContainer>
        {/* Background da página de estoque desfocado */}
        <EstoqueBackground>
          <EstoqueContent>
            <Header>
              <Title>Controle de Estoque</Title>
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
            </Header>

            <StatsCards>
              <StatCard>
                <StatIcon $color="#0b4200">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatLabel>Total de Livros</StatLabel>
                  <StatValue>{totalBooks}</StatValue>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon $color="#dc3545">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatLabel>Estoque Baixo</StatLabel>
                  <StatValue>{lowStockBooks}</StatValue>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon $color="#28a745">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatLabel>Valor em Estoque</StatLabel>
                  <StatValue>R$ {formatCurrency(totalStockValue)}</StatValue>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon $color="#17a2b8">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatLabel>Total de Itens</StatLabel>
                  <StatValue>{totalItems}</StatValue>
                </StatInfo>
              </StatCard>
            </StatsCards>

            <FilterSection>
              <FilterGroup>
                <FilterDropdown>
                  <FilterButton disabled>
                    <span>Categoria</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </FilterButton>
                </FilterDropdown>

                <FilterDropdown>
                  <FilterButton disabled>
                    <span>Nível de Estoque</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </FilterButton>
                </FilterDropdown>
              </FilterGroup>
            </FilterSection>

            <BooksTable>
              <TableHeader>
                <TableRow $isHeader>
                  <TableHeaderCell $width="35%">Produto</TableHeaderCell>
                  <TableHeaderCell $width="18%">Categoria</TableHeaderCell>
                  <TableHeaderCell $width="15%">Preço</TableHeaderCell>
                  <TableHeaderCell $width="18%">Estoque</TableHeaderCell>
                  <TableHeaderCell $width="14%">Ações</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {inventoryBooks.slice(0, 8).map(b => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <TableBookDetails>
                        <TableBookImage src={b.cover} alt={b.title} />
                        <div>
                          <TableBookTitle>{b.title}</TableBookTitle>
                          <TableBookAuthor>{b.author}</TableBookAuthor>
                        </div>
                      </TableBookDetails>
                    </TableCell>
                    <TableCell>
                      <TableCategoryBadge>{b.category}</TableCategoryBadge>
                    </TableCell>
                    <TableCell>
                      <PriceTag>R$ {formatCurrency(b.price)}</PriceTag>
                    </TableCell>
                    <TableCell>
                      <TableStockBadge $status={getStockStatus(b.stock)}>
                        {b.stock} unidades
                      </TableStockBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton title="Editar">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </ActionButton>
                        <ActionButton title="Detalhes">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="16" x2="12" y2="12"/>
                            <line x1="12" y1="8" x2="12.01" y2="8"/>
                          </svg>
                        </ActionButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </BooksTable>
          </EstoqueContent>
        </EstoqueBackground>

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
                    <PriceValue>R$ {formatCurrency(book.price)}</PriceValue>
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
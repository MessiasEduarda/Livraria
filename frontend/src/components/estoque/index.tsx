'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { 
  Container, 
  Header,
  Title,
  SearchBar,
  SearchInput,
  SearchIcon,
  FilterSection,
  FilterGroup,
  FilterDropdown,
  FilterButton,
  FilterList,
  FilterOption,
  ClearFilters,
  StatsCards,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  BooksTable,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  BookImage,
  BookDetails,
  BookTitle,
  BookAuthor,
  StockBadge,
  PriceTag,
  ActionButtons,
  ActionButton,
  EmptyState,
  CategoryBadge
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

const categories = ["Ficção", "Tecnologia", "Fantasia", "História", "Autoajuda", "Filosofia"];
const stockLevels = [
  { label: "Todos", value: "all" },
  { label: "Estoque Baixo", value: "low" },
  { label: "Estoque Médio", value: "medium" },
  { label: "Estoque Alto", value: "high" }
];

export default function Estoque() {
  const [books] = useState<Book[]>(inventoryBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStockLevel, setSelectedStockLevel] = useState('all');
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isStockFilterOpen, setIsStockFilterOpen] = useState(false);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    
    let matchesStock = true;
    if (selectedStockLevel === 'low') {
      matchesStock = book.stock < 10;
    } else if (selectedStockLevel === 'medium') {
      matchesStock = book.stock >= 10 && book.stock <= 20;
    } else if (selectedStockLevel === 'high') {
      matchesStock = book.stock > 20;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalBooks = books.length;
  const lowStockBooks = books.filter(b => b.stock < 10).length;
  const totalStockValue = books.reduce((acc, book) => acc + (book.price * book.stock), 0);
  const totalItems = books.reduce((acc, book) => acc + book.stock, 0);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedStockLevel('all');
    setIsCategoryFilterOpen(false);
    setIsStockFilterOpen(false);
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

  const hasActiveFilters = selectedCategory || selectedStockLevel !== 'all';

  return (
    <Navbar>
      <Container>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <FilterButton onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}>
                <span>{selectedCategory || 'Categoria'}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={isCategoryFilterOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </FilterButton>
              
              {isCategoryFilterOpen && (
                <FilterList>
                  <FilterOption 
                    $active={!selectedCategory}
                    onClick={() => {
                      setSelectedCategory('');
                      setIsCategoryFilterOpen(false);
                    }}
                  >
                    Todas as Categorias
                  </FilterOption>
                  {categories.map(category => (
                    <FilterOption
                      key={category}
                      $active={selectedCategory === category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryFilterOpen(false);
                      }}
                    >
                      {category}
                    </FilterOption>
                  ))}
                </FilterList>
              )}
            </FilterDropdown>

            <FilterDropdown>
              <FilterButton onClick={() => setIsStockFilterOpen(!isStockFilterOpen)}>
                <span>{stockLevels.find(l => l.value === selectedStockLevel)?.label || 'Nível de Estoque'}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={isStockFilterOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </FilterButton>
              
              {isStockFilterOpen && (
                <FilterList>
                  {stockLevels.map(level => (
                    <FilterOption
                      key={level.value}
                      $active={selectedStockLevel === level.value}
                      onClick={() => {
                        setSelectedStockLevel(level.value);
                        setIsStockFilterOpen(false);
                      }}
                    >
                      {level.label}
                    </FilterOption>
                  ))}
                </FilterList>
              )}
            </FilterDropdown>

            {hasActiveFilters && (
              <ClearFilters onClick={handleClearFilters}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Limpar Filtros
              </ClearFilters>
            )}
          </FilterGroup>
        </FilterSection>

        {filteredBooks.length > 0 ? (
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
              {filteredBooks.map(book => (
                <TableRow key={book.id}>
                  <TableCell>
                    <BookDetails>
                      <BookImage src={book.cover} alt={book.title} />
                      <div>
                        <BookTitle>{book.title}</BookTitle>
                        <BookAuthor>{book.author}</BookAuthor>
                      </div>
                    </BookDetails>
                  </TableCell>
                  <TableCell>
                    <CategoryBadge>{book.category}</CategoryBadge>
                  </TableCell>
                  <TableCell>
                    <PriceTag>R$ {formatCurrency(book.price)}</PriceTag>
                  </TableCell>
                  <TableCell>
                    <StockBadge $status={getStockStatus(book.stock)}>
                      {book.stock} unidades
                    </StockBadge>
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
        ) : (
          <EmptyState>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <h3>Nenhum livro encontrado</h3>
            <p>Tente ajustar os filtros ou buscar por outro termo</p>
          </EmptyState>
        )}
      </Container>
    </Navbar>
  );
}
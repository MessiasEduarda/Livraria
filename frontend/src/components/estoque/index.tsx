'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import EditablePageTitle from '@/components/EditablePageTitle';
import Pagination, { PAGE_SIZE_DEFAULT } from '@/components/Pagination';
import { listarTodosLivros, listarCategorias, type LivroDTO, type CategoriaDTO } from '@/services/api';
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
  TableWrapper,
  BooksTable,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  BookImage,
  BookImagePlaceholder,
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

const stockLevels = [
  { label: "Todos", value: "all" },
  { label: "Esgotados", value: "out" },
  { label: "Estoque Baixo", value: "low" },
  { label: "Estoque Médio", value: "medium" },
  { label: "Estoque Alto", value: "high" }
];

export default function Estoque() {
  const router = useRouter();
  const [books, setBooks] = useState<LivroDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoriaDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStockLevel, setSelectedStockLevel] = useState('all');
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isStockFilterOpen, setIsStockFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    listarCategorias().then(setCategories).catch(() => setCategories([]));
  }, []);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const lista = await listarTodosLivros();
      setBooks(lista || []);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.categoria === selectedCategory;
    let matchesStock = true;
    if (selectedStockLevel === 'out') {
      matchesStock = (book.estoque ?? 0) === 0;
    } else if (selectedStockLevel === 'low') {
      matchesStock = (book.estoque ?? 0) > 0 && book.estoque < 10;
    } else if (selectedStockLevel === 'medium') {
      matchesStock = book.estoque >= 10 && book.estoque <= 20;
    } else if (selectedStockLevel === 'high') {
      matchesStock = book.estoque > 20;
    }
    return matchesSearch && matchesCategory && matchesStock;
  });

  useEffect(() => {
    setPage(1);
  }, [filteredBooks.length]);

  const totalBooks = books.length;
  const lowStockBooks = books.filter(b => b.estoque < 10).length;
  const totalStockValue = books.reduce((acc, book) => acc + (Number(book.preco) * book.estoque), 0);
  const totalItems = books.reduce((acc, book) => acc + book.estoque, 0);

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

  const handleViewDetails = (bookId: number) => {
    router.push(`/estoque/detalhes/${bookId}`);
  };

  const handleEditBook = (bookId: number) => {
    router.push(`/estoque/editar/${bookId}`);
  };

  const hasActiveFilters = selectedCategory || selectedStockLevel !== 'all';

  return (
    <Navbar>
      <Container>
        <Header>
          <EditablePageTitle pageKey="estoque" defaultTitle="Estoque">
            {(title) => <Title>{title}</Title>}
          </EditablePageTitle>
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
                  {categories.map(cat => (
                    <FilterOption
                      key={cat.id}
                      $active={selectedCategory === cat.nome}
                      onClick={() => {
                        setSelectedCategory(cat.nome);
                        setIsCategoryFilterOpen(false);
                      }}
                    >
                      {cat.nome}
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

        {loading ? (
          <EmptyState>
            <p>Carregando estoque...</p>
          </EmptyState>
        ) : filteredBooks.length > 0 ? (
          <TableWrapper>
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
              {filteredBooks
                .slice((page - 1) * PAGE_SIZE_DEFAULT, page * PAGE_SIZE_DEFAULT)
                .map(book => (
                <TableRow key={book.id}>
                  <TableCell>
                    <BookDetails>
                      {book.imagemCapa ? (
                        <BookImage src={book.imagemCapa} alt={book.titulo} />
                      ) : (
                        <BookImagePlaceholder>Sem capa</BookImagePlaceholder>
                      )}
                      <div>
                        <BookTitle>{book.titulo}</BookTitle>
                        <BookAuthor>{book.autor}</BookAuthor>
                      </div>
                    </BookDetails>
                  </TableCell>
                  <TableCell>
                    <CategoryBadge>{book.categoria}</CategoryBadge>
                  </TableCell>
                  <TableCell>
                    <PriceTag>R$ {formatCurrency(Number(book.preco))}</PriceTag>
                  </TableCell>
                  <TableCell>
                    <StockBadge $status={getStockStatus(book.estoque)}>
                      {book.estoque} unidades
                    </StockBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton title="Editar" onClick={() => handleEditBook(book.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </ActionButton>
                      <ActionButton title="Detalhes" onClick={() => handleViewDetails(book.id)}>
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
          <Pagination
            total={filteredBooks.length}
            pageSize={PAGE_SIZE_DEFAULT}
            currentPage={page}
            onPageChange={setPage}
            itemLabel="livros"
          />
          </TableWrapper>
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
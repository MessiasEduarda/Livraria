'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import EditablePageTitle from '@/components/EditablePageTitle';
import FormDropdown from '@/components/FormDropdown';
import { listarTodosLivros, criarLivro, listarCategorias, type LivroDTO, type CategoriaDTO } from '@/services/api';
import ConfirmModal from '@/components/modals/confirmModal';
import CancelModal from '@/components/modals/cancelModal';
import SucessModal from '@/components/modals/sucessModal';
import {
  validateTitle,
  validateAuthor,
  validateCategory,
  validatePrice,
  validateStock,
  validateBookForm
} from './validation';
import { 
  Container, 
  Header,
  Title,
  SearchBar,
  SearchInput,
  SearchIcon,
  FilterSection,
  FilterDropdown,
  FilterButton,
  FilterList,
  FilterOption,
  EsgotadosFilterButton,
  ClearFilter,
  AddButton,
  BooksGrid,
  BookCard,
  BookCover,
  BookCoverPlaceholder,
  BookInfo,
  BookTitle,
  BookAuthor,
  BookPrice,
  BookCategory,
  BookActions,
  ActionButton,
  EmptyState,
  StockBadge,
  PriceSection,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  FormGroup,
  CategoryDropdownWrap,
  Label,
  Input,
  Select,
  ImageUpload,
  ImagePreview,
  ModalFooter,
  CancelButton,
  SubmitButton,
  FieldError
} from './styles';

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<LivroDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoriaDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOnlyOutOfStock, setShowOnlyOutOfStock] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    stock: '',
    cover: ''
  });

  // Estados de erro
  const [titleError, setTitleError] = useState<string>('');
  const [authorError, setAuthorError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');
  const [stockError, setStockError] = useState<string>('');
  const [addBookError, setAddBookError] = useState<string>('');

  // Estados para controlar se o campo foi tocado
  const [titleTouched, setTitleTouched] = useState(false);
  const [authorTouched, setAuthorTouched] = useState(false);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [priceTouched, setPriceTouched] = useState(false);
  const [stockTouched, setStockTouched] = useState(false);

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

  useEffect(() => {
    listarCategorias().then(setCategories).catch(() => setCategories([]));
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.autor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.categoria === selectedCategory;
    const matchesStock = !showOnlyOutOfStock || (book.estoque ?? 0) === 0;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleClearFilter = () => {
    setSelectedCategory('');
    setShowOnlyOutOfStock(false);
    setIsFilterOpen(false);
  };

  const getStockStatus = (stock: number): 'low' | 'medium' | 'high' => {
    if (stock < 10) return 'low';
    if (stock <= 20) return 'medium';
    return 'high';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewBook({ ...newBook, cover: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Limpa todos os erros
  function clearAllErrors() {
    setTitleError('');
    setAuthorError('');
    setCategoryError('');
    setPriceError('');
    setStockError('');
  }

  // Validações individuais em tempo real (só após o campo ser tocado)
  function handleTitleBlur() {
    setTitleTouched(true);
    if (newBook.title.trim()) {
      const error = validateTitle(newBook.title);
      setTitleError(error ? error.message : '');
    }
  }

  function handleAuthorBlur() {
    setAuthorTouched(true);
    if (newBook.author.trim()) {
      const error = validateAuthor(newBook.author);
      setAuthorError(error ? error.message : '');
    }
  }

  function handleCategoryBlur() {
    setCategoryTouched(true);
    if (newBook.category) {
      const error = validateCategory(newBook.category);
      setCategoryError(error ? error.message : '');
    }
  }

  function handlePriceBlur() {
    setPriceTouched(true);
    if (newBook.price) {
      const error = validatePrice(newBook.price);
      setPriceError(error ? error.message : '');
    }
  }

  function handleStockBlur() {
    setStockTouched(true);
    if (newBook.stock) {
      const error = validateStock(newBook.stock);
      setStockError(error ? error.message : '');
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setNewBook({ ...newBook, [field]: value });

    // Limpa erro do campo específico se ele foi tocado
    if (field === 'title' && titleTouched) {
      setTitleError('');
    } else if (field === 'author' && authorTouched) {
      setAuthorError('');
    } else if (field === 'category' && categoryTouched) {
      setCategoryError('');
    } else if (field === 'price' && priceTouched) {
      setPriceError('');
    } else if (field === 'stock' && stockTouched) {
      setStockError('');
    }
  };

  const handleAddBookClick = () => {
    // Marca todos os campos como tocados
    setTitleTouched(true);
    setAuthorTouched(true);
    setCategoryTouched(true);
    setPriceTouched(true);
    setStockTouched(true);

    // Limpa erros anteriores
    clearAllErrors();

    // Valida o formulário completo
    const validationError = validateBookForm(newBook);

    if (validationError) {
      // Define o erro no campo apropriado
      if (validationError.field === 'title') {
        setTitleError(validationError.message);
      } else if (validationError.field === 'author') {
        setAuthorError(validationError.message);
      } else if (validationError.field === 'category') {
        setCategoryError(validationError.message);
      } else if (validationError.field === 'price') {
        setPriceError(validationError.message);
      } else if (validationError.field === 'stock') {
        setStockError(validationError.message);
      }
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirmAddBook = async () => {
    setAddBookError('');
    const preco = Number(newBook.price);
    const estoqueNum = parseInt(newBook.stock, 10);
    try {
      await criarLivro({
        titulo: newBook.title.trim(),
        autor: newBook.author.trim(),
        preco: Number.isFinite(preco) ? preco : 0,
        categoria: newBook.category.trim(),
        estoque: Number.isInteger(estoqueNum) && estoqueNum >= 0 ? estoqueNum : 0,
        imagemCapa: newBook.cover || undefined,
      });
      setIsConfirmModalOpen(false);
      setIsModalOpen(false);
      setNewBook({ title: '', author: '', price: '', category: '', stock: '', cover: '' });
      setImagePreview('');
      clearAllErrors();
      setAddBookError('');
      setTitleTouched(false);
      setAuthorTouched(false);
      setCategoryTouched(false);
      setPriceTouched(false);
      setStockTouched(false);
      setIsSuccessModalOpen(true);
      carregar();
    } catch (err) {
      setIsConfirmModalOpen(false);
      setAddBookError(err instanceof Error ? err.message : 'Erro ao adicionar livro. Tente novamente.');
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  const isFormFilled = () => {
    return newBook.title || newBook.author || newBook.price || newBook.category || newBook.stock || newBook.cover;
  };

  const handleCloseModal = () => {
      if (isFormFilled()) {
        setIsCancelModalOpen(true);
      } else {
        setIsModalOpen(false);
        setAddBookError('');
        setNewBook({ title: '', author: '', price: '', category: '', stock: '', cover: '' });
        setImagePreview('');
        clearAllErrors();
      setTitleTouched(false);
      setAuthorTouched(false);
      setCategoryTouched(false);
      setPriceTouched(false);
      setStockTouched(false);
    }
  };

  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    setIsModalOpen(false);
    setAddBookError('');
    setNewBook({ title: '', author: '', price: '', category: '', stock: '', cover: '' });
    setImagePreview('');
    clearAllErrors();
    setTitleTouched(false);
    setAuthorTouched(false);
    setCategoryTouched(false);
    setPriceTouched(false);
    setStockTouched(false);
  };

  const handleCancelClose = () => {
    setIsCancelModalOpen(false);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleViewDetails = (bookId: number) => {
    router.push(`/home/detalhes/${bookId}`);
  };

  const handleEditBook = (bookId: number) => {
    router.push(`/home/editar/${bookId}`);
  };

  return (
    <Navbar>
      <Container>
        <Header>
          <EditablePageTitle pageKey="home" defaultTitle="Livros">
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

        <FilterSection>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FilterDropdown>
              <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span>Categoria</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={isFilterOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </FilterButton>
              
              {isFilterOpen && (
                <FilterList>
                  <FilterOption 
                    $active={!selectedCategory}
                    onClick={() => {
                      setSelectedCategory('');
                      setIsFilterOpen(false);
                    }}
                  >
                    Geral
                  </FilterOption>
                  {categories.map(cat => (
                    <FilterOption
                      key={cat.id}
                      $active={selectedCategory === cat.nome}
                      onClick={() => {
                        setSelectedCategory(cat.nome);
                        setIsFilterOpen(false);
                      }}
                    >
                      {cat.nome}
                    </FilterOption>
                  ))}
                </FilterList>
              )}
            </FilterDropdown>

            <EsgotadosFilterButton
              type="button"
              $active={showOnlyOutOfStock}
              onClick={() => setShowOnlyOutOfStock(!showOnlyOutOfStock)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Somente esgotados
            </EsgotadosFilterButton>

            {(selectedCategory || showOnlyOutOfStock) && (
              <ClearFilter onClick={handleClearFilter}>
                Limpar filtros
              </ClearFilter>
            )}
          </div>

          <AddButton onClick={() => setIsModalOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Adicionar Livro
          </AddButton>
        </FilterSection>

        {loading ? (
          <EmptyState>
            <p>Carregando livros...</p>
          </EmptyState>
        ) : filteredBooks.length > 0 ? (
          <BooksGrid>
            {filteredBooks.map(book => (
              <BookCard key={book.id}>
                {book.imagemCapa ? (
                  <BookCover src={book.imagemCapa} alt={book.titulo} />
                ) : (
                  <BookCoverPlaceholder>Sem capa</BookCoverPlaceholder>
                )}
                <BookInfo>
                  <BookCategory>{book.categoria}</BookCategory>
                  <BookTitle>{book.titulo}</BookTitle>
                  <BookAuthor>{book.autor}</BookAuthor>
                  
                  <PriceSection>
                    <BookPrice>R$ {Number(book.preco).toFixed(2)}</BookPrice>
                    <StockBadge $status={getStockStatus(book.estoque)}>
                      Estoque: {book.estoque}
                    </StockBadge>
                  </PriceSection>
                  
                  <BookActions>
                    <ActionButton $primary onClick={() => handleViewDetails(book.id)}>Ver Detalhes</ActionButton>
                    <ActionButton onClick={() => handleEditBook(book.id)}>Editar</ActionButton>
                  </BookActions>
                </BookInfo>
              </BookCard>
            ))}
          </BooksGrid>
        ) : (
          <EmptyState>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <h3>Nenhum livro encontrado</h3>
            <p>Tente ajustar os filtros ou buscar por outro termo</p>
          </EmptyState>
        )}

        {isModalOpen && (
          <Modal>
            <ModalOverlay onClick={handleCloseModal} />
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Adicionar Novo Livro</ModalTitle>
                <ModalClose onClick={handleCloseModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </ModalClose>
              </ModalHeader>

              <ModalBody>
                {addBookError && (
                  <div style={{ marginBottom: 16, padding: '12px', background: 'rgba(239,68,68,0.15)', borderRadius: 8, color: '#f87171', fontSize: 14 }}>
                    {addBookError}
                  </div>
                )}
                <FormGroup>
                  <Label>Título do Livro *</Label>
                  <Input 
                    type="text"
                    placeholder="Digite o título"
                    value={newBook.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    onBlur={handleTitleBlur}
                    $hasError={!!titleError}
                  />
                  {titleError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {titleError}
                    </FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Autor *</Label>
                  <Input 
                    type="text"
                    placeholder="Digite o nome do autor"
                    value={newBook.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    onBlur={handleAuthorBlur}
                    $hasError={!!authorError}
                  />
                  {authorError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {authorError}
                    </FieldError>
                  )}
                </FormGroup>

                <CategoryDropdownWrap>
                <FormGroup>
                  <Label>Categoria *</Label>
                  <FormDropdown
                    options={categories.map(cat => ({ value: cat.nome, label: cat.nome }))}
                    value={newBook.category}
                    onChange={(v) => handleInputChange('category', v)}
                    onBlur={handleCategoryBlur}
                    placeholder="Selecione uma categoria"
                    hasError={!!categoryError}
                    maxVisibleOptions={2}
                  />
                  {categoryError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {categoryError}
                    </FieldError>
                  )}
                </FormGroup>
                </CategoryDropdownWrap>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormGroup>
                    <Label>Preço (R$) *</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newBook.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      onBlur={handlePriceBlur}
                      $hasError={!!priceError}
                    />
                    {priceError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {priceError}
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Estoque *</Label>
                    <Input 
                      type="number"
                      placeholder="0"
                      value={newBook.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      onBlur={handleStockBlur}
                      $hasError={!!stockError}
                    />
                    {stockError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {stockError}
                      </FieldError>
                    )}
                  </FormGroup>
                </div>

                <FormGroup>
                  <Label>Imagem da Capa (opcional)</Label>
                  <ImageUpload>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                      {imagePreview ? (
                        <ImagePreview src={imagePreview} alt="Preview" />
                      ) : (
                        <>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span style={{ color: '#999', fontSize: '0.9rem' }}>Clique para adicionar imagem</span>
                        </>
                      )}
                    </label>
                  </ImageUpload>
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <CancelButton onClick={handleCloseModal}>Cancelar</CancelButton>
                <SubmitButton onClick={handleAddBookClick}>Adicionar Livro</SubmitButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          title="Confirmar Cadastro"
          message="Deseja realmente cadastrar este livro?"
          onConfirm={handleConfirmAddBook}
          onCancel={handleCancelConfirm}
          confirmText="Confirmar"
          cancelText="Cancelar"
        />

        <CancelModal
          isOpen={isCancelModalOpen}
          title="Cancelar Cadastro"
          message="Tem certeza que deseja cancelar? Todos os dados preenchidos serão perdidos."
          onConfirm={handleConfirmCancel}
          onCancel={handleCancelClose}
        />

        <SucessModal
          isOpen={isSuccessModalOpen}
          title="Livro Cadastrado!"
          message="O livro foi cadastrado com sucesso no sistema."
          onClose={handleSuccessClose}
          buttonText="Continuar"
        />
      </Container>
    </Navbar>
  );
}
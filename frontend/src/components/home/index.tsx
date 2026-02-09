'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
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
  ClearFilter,
  AddButton,
  BooksGrid,
  BookCard,
  BookCover,
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

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  cover: string;
  stock: number;
}

const initialBooks: Book[] = [
  { id: 1, title: "1984", author: "George Orwell", price: 45.90, category: "Ficção", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", stock: 12 },
  { id: 2, title: "Clean Code", author: "Robert Martin", price: 89.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", stock: 8 },
  { id: 3, title: "O Hobbit", author: "J.R.R. Tolkien", price: 52.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", stock: 15 },
  { id: 4, title: "Sapiens", author: "Yuval Harari", price: 64.90, category: "História", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop", stock: 20 },
  { id: 5, title: "O Poder do Hábito", author: "Charles Duhigg", price: 42.90, category: "Autoajuda", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", stock: 10 },
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", price: 58.90, category: "Fantasia", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYT34ybnLwicWjbYWoXNtiHZ_V20iG7XuFg&s", stock: 25 },
  { id: 7, title: "A Arte da Guerra", author: "Sun Tzu", price: 35.90, category: "Filosofia", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", stock: 18 },
  { id: 8, title: "Algoritmos", author: "Thomas Cormen", price: 125.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop", stock: 5 },
];

const categories = ["Ficção", "Tecnologia", "Fantasia", "História", "Autoajuda", "Filosofia"];

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

  // Estados para controlar se o campo foi tocado
  const [titleTouched, setTitleTouched] = useState(false);
  const [authorTouched, setAuthorTouched] = useState(false);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [priceTouched, setPriceTouched] = useState(false);
  const [stockTouched, setStockTouched] = useState(false);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClearFilter = () => {
    setSelectedCategory('');
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

  const handleConfirmAddBook = () => {
    const book: Book = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      price: parseFloat(newBook.price),
      category: newBook.category,
      stock: parseInt(newBook.stock),
      cover: newBook.cover || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
    };

    setBooks([...books, book]);
    setIsConfirmModalOpen(false);
    setIsModalOpen(false);
    setNewBook({ title: '', author: '', price: '', category: '', stock: '', cover: '' });
    setImagePreview('');
    clearAllErrors();
    setTitleTouched(false);
    setAuthorTouched(false);
    setCategoryTouched(false);
    setPriceTouched(false);
    setStockTouched(false);
    setIsSuccessModalOpen(true);
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
          <Title>Gerenciamento de Livraria</Title>
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
                  {categories.map(category => (
                    <FilterOption
                      key={category}
                      $active={selectedCategory === category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                    >
                      {category}
                    </FilterOption>
                  ))}
                </FilterList>
              )}
            </FilterDropdown>

            {selectedCategory && (
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

        {filteredBooks.length > 0 ? (
          <BooksGrid>
            {filteredBooks.map(book => (
              <BookCard key={book.id}>
                <BookCover src={book.cover} alt={book.title} />
                <BookInfo>
                  <BookCategory>{book.category}</BookCategory>
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                  
                  <PriceSection>
                    <BookPrice>R$ {book.price.toFixed(2)}</BookPrice>
                    <StockBadge $status={getStockStatus(book.stock)}>
                      Estoque: {book.stock}
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

                <FormGroup>
                  <Label>Categoria *</Label>
                  <Select 
                    value={newBook.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    onBlur={handleCategoryBlur}
                    $hasError={!!categoryError}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
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
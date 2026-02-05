'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
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
  SubmitButton
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
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", price: 58.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1618836850461-81b3a1969e30?w=400&h=600&fit=crop", stock: 25 },
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
  
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    stock: '',
    cover: ''
  });

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

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.price || !newBook.category || !newBook.stock) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

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
    setIsModalOpen(false);
    setNewBook({ title: '', author: '', price: '', category: '', stock: '', cover: '' });
    setImagePreview('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewBook({ title: '', author: '', price: '', category: '', stock: '', cover: '' });
    setImagePreview('');
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
                    active={!selectedCategory}
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
                      active={selectedCategory === category}
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
                  <Label>Título do Livro</Label>
                  <Input 
                    type="text"
                    placeholder="Digite o título"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Autor</Label>
                  <Input 
                    type="text"
                    placeholder="Digite o nome do autor"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Categoria</Label>
                  <Select 
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </FormGroup>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormGroup>
                    <Label>Preço (R$)</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newBook.price}
                      onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Estoque</Label>
                    <Input 
                      type="number"
                      placeholder="0"
                      value={newBook.stock}
                      onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                    />
                  </FormGroup>
                </div>

                <FormGroup>
                  <Label>Imagem da Capa</Label>
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
                <SubmitButton onClick={handleAddBook}>Adicionar Livro</SubmitButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </Navbar>
  );
}

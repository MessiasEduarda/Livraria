'use client';

import { useState, useEffect } from 'react';
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
  BookCover,
  BookInfo,
  BookCategory,
  BookTitle,
  BookAuthor,
  BookPrice,
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
  TwoColumnGrid
} from './styles';

const booksData = [
  { id: 1, title: "1984", author: "George Orwell", price: 45.90, category: "Ficção", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", stock: 12 },
  { id: 2, title: "Clean Code", author: "Robert Martin", price: 89.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", stock: 8 },
  { id: 3, title: "O Hobbit", author: "J.R.R. Tolkien", price: 52.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", stock: 15 },
  { id: 4, title: "Sapiens", author: "Yuval Harari", price: 64.90, category: "História", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop", stock: 20 },
  { id: 5, title: "O Poder do Hábito", author: "Charles Duhigg", price: 42.90, category: "Autoajuda", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", stock: 10 },
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", price: 58.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1618836850461-81b3a1969e30?w=400&h=600&fit=crop", stock: 25 },
  { id: 7, title: "A Arte da Guerra", author: "Sun Tzu", price: 35.90, category: "Filosofia", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", stock: 18 },
  { id: 8, title: "Algoritmos", author: "Thomas Cormen", price: 125.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop", stock: 5 },
];

export default function EditarComponent() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string);
  
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    author: '',
    price: 0,
    stock: 0,
    category: '',
    cover: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const categories = ["Programação", "JavaScript", "Arquitetura de Software", "Desenvolvimento", "Design", "Ficção", "Tecnologia", "Fantasia", "História", "Autoajuda", "Filosofia"];

  useEffect(() => {
    const book = booksData.find(b => b.id === bookId);
    if (book) {
      setFormData({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        stock: book.stock,
        category: book.category,
        cover: book.cover
      });
      if (book.cover) {
        setImagePreview(book.cover);
      }
    }
    setLoading(false);
  }, [bookId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'stock'].includes(name) 
        ? Number(value) 
        : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, cover: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setSaving(true);
    
    setTimeout(() => {
      // Aqui você pode implementar a lógica de salvar
      console.log('Dados salvos:', formData);
      setSaving(false);
      router.push('/home');
    }, 1000);
  };

  const handleClose = () => {
    router.push('/home');
  };

  if (loading) {
    return (
      <Navbar>
        <PageContainer>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p style={{ fontSize: '1.25rem', color: '#666' }}>Carregando...</p>
          </div>
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
                  <BookCover src={b.cover} alt={b.title} />
                  <BookInfo>
                    <BookCategory>{b.category}</BookCategory>
                    <BookTitle>{b.title}</BookTitle>
                    <BookAuthor>{b.author}</BookAuthor>
                    <BookPrice>R$ {b.price.toFixed(2)}</BookPrice>
                  </BookInfo>
                </BookCard>
              ))}
            </BooksGrid>
          </HomeContent>
        </HomeBackground>

        {/* Modal de Edição */}
        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Editar Livro</ModalTitle>
              <ModalClose onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Título do Livro</Label>
                  <Input 
                    type="text"
                    name="title"
                    placeholder="Digite o título"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Autor</Label>
                  <Input 
                    type="text"
                    name="author"
                    placeholder="Digite o nome do autor"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Categoria</Label>
                  <Select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </FormGroup>

                <TwoColumnGrid>
                  <FormGroup>
                    <Label>Preço (R$)</Label>
                    <Input 
                      type="number"
                      name="price"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Estoque</Label>
                    <Input 
                      type="number"
                      name="stock"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </TwoColumnGrid>

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

                <ModalFooter>
                  <CancelButton type="button" onClick={handleClose}>
                    Cancelar
                  </CancelButton>
                  <SubmitButton type="submit" disabled={saving}>
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </SubmitButton>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}
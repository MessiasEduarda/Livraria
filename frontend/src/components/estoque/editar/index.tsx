'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import CancelModal from '@/components/modals/cancelModal';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
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
  FormGroup,
  Label,
  Input,
  Select,
  ImageUpload,
  ImagePreview,
  ModalFooter,
  CancelButton,
  SubmitButton,
  NotFound,
  BackButton
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

export default function EditarEstoqueComponent() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string);
  
  const book = inventoryBooks.find(b => b.id === bookId);

  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    price: book?.price.toString() || '',
    category: book?.category || '',
    stock: book?.stock.toString() || '',
    cover: book?.cover || ''
  });

  const [originalData, setOriginalData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    price: book?.price.toString() || '',
    category: book?.category || '',
    stock: book?.stock.toString() || '',
    cover: book?.cover || ''
  });

  const [imagePreview, setImagePreview] = useState(book?.cover || '');
  const [hasChanges, setHasChanges] = useState(false);

  // Estados dos modais
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Verificar se houve alterações
  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(changed);
  }, [formData, originalData]);

  const handleCancelClick = () => {
    if (hasChanges) {
      setShowCancelModal(true);
    } else {
      router.push('/estoque');
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push('/estoque');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, cover: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitClick = () => {
    if (!formData.title || !formData.author || !formData.price || !formData.category || !formData.stock) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    
    // Simular salvamento
    setTimeout(() => {
      console.log('Livro atualizado:', formData);
      setShowSuccessModal(true);
    }, 500);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/estoque');
  };

  const handleClose = () => {
    handleCancelClick();
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
            <BackButton onClick={() => router.push('/estoque')}>
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

        {/* Modal de Edição */}
        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Editar Livro no Estoque</ModalTitle>
              <ModalClose onClick={handleClose}>
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Autor</Label>
                <Input 
                  type="text"
                  placeholder="Digite o nome do autor"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Categoria</Label>
                <Select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Estoque</Label>
                  <Input 
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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
                        <span style={{ color: '#999', fontSize: '0.9rem' }}>Clique para alterar imagem</span>
                      </>
                    )}
                  </label>
                </ImageUpload>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <CancelButton onClick={handleCancelClick}>Cancelar</CancelButton>
              <SubmitButton onClick={handleSubmitClick}>Salvar Alterações</SubmitButton>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Cancelar Edição */}
        <CancelModal
          isOpen={showCancelModal}
          title="Cancelar Edição de Estoque"
          message="Tem certeza que deseja cancelar? Todas as alterações no estoque serão perdidas."
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />

        {/* Modal de Confirmar Salvamento */}
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Confirmar Atualização de Estoque"
          message="Deseja realmente salvar as alterações no estoque deste livro?"
          confirmText="Salvar"
          cancelText="Cancelar"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirmModal(false)}
        />

        {/* Modal de Sucesso */}
        <SucessModal
          isOpen={showSuccessModal}
          title="Estoque Atualizado!"
          message="As informações de estoque do livro foram atualizadas com sucesso no sistema."
          buttonText="Continuar"
          onClose={handleSuccessClose}
        />
      </PageContainer>
    </Navbar>
  );
}
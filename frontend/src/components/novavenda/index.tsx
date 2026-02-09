'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import ConfirmModal from '@/components/modals/confirmModal';
import CancelModal from '@/components/modals/cancelModal';
import SucessModal from '@/components/modals/sucessModal';
import {
  validateClientName,
  validateClientEmail,
  validateClientPhone,
  validateClientCPF,
  validateCart,
  validateDiscount,
  validateTotal,
  validateSaleForm
} from './validation';
import {
  Container,
  Header,
  Title,
  MainContent,
  LeftPanel,
  RightPanel,
  Section,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  Select,
  SearchBar,
  SearchIcon,
  SearchInput,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductAuthor,
  ProductPrice,
  ProductStock,
  AddButton,
  CartSection,
  CartHeader,
  CartItems,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  QuantityControl,
  QuantityButton,
  QuantityDisplay,
  RemoveButton,
  CartSummary,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalRow,
  TotalLabel,
  TotalValue,
  ActionButtons,
  CancelButton,
  FinishButton,
  EmptyCart,
  Badge,
  PaymentMethod,
  PaymentOption,
  DiscountInput,
  Notes,
  FormRow,
  FieldError,
  SellerDropdown,
  SellerButton,
  SellerList,
  SellerOption
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

interface CartItem extends Book {
  quantity: number;
}

interface Seller {
  id: number;
  name: string;
}

const booksData: Book[] = [
  { id: 1, title: "1984", author: "George Orwell", price: 45.90, category: "Ficção", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop", stock: 12 },
  { id: 2, title: "Clean Code", author: "Robert Martin", price: 89.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop", stock: 8 },
  { id: 3, title: "O Hobbit", author: "J.R.R. Tolkien", price: 52.90, category: "Fantasia", cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop", stock: 15 },
  { id: 4, title: "Sapiens", author: "Yuval Harari", price: 64.90, category: "História", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop", stock: 20 },
  { id: 5, title: "O Poder do Hábito", author: "Charles Duhigg", price: 42.90, category: "Autoajuda", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", stock: 10 },
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", price: 58.90, category: "Fantasia", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYT34ybnLwicWjbYWoXNtiHZ_V20iG7XuFg&s", stock: 25 },
  { id: 7, title: "A Arte da Guerra", author: "Sun Tzu", price: 35.90, category: "Filosofia", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", stock: 18 },
  { id: 8, title: "Algoritmos", author: "Thomas Cormen", price: 125.90, category: "Tecnologia", cover: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop", stock: 5 },
];

const sellersData: Seller[] = [
  { id: 1, name: "Maria" },
  { id: 2, name: "Henrique" }
];

export default function NovaVenda() {
  const router = useRouter();
  const [books] = useState<Book[]>(booksData);
  const [sellers] = useState<Seller[]>(sellersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Dados do cliente
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCPF, setClientCPF] = useState('');
  
  // Dados da venda
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null);
  const [isSellerDropdownOpen, setIsSellerDropdownOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [discount, setDiscount] = useState('');
  const [notes, setNotes] = useState('');
  
  // Modais
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Estados de erro
  const [clientNameError, setClientNameError] = useState<string>('');
  const [clientEmailError, setClientEmailError] = useState<string>('');
  const [clientPhoneError, setClientPhoneError] = useState<string>('');
  const [clientCPFError, setClientCPFError] = useState<string>('');
  const [discountError, setDiscountError] = useState<string>('');
  const [sellerError, setSellerError] = useState<string>('');

  // Estados para controlar se o campo foi tocado
  const [clientNameTouched, setClientNameTouched] = useState(false);
  const [clientEmailTouched, setClientEmailTouched] = useState(false);
  const [clientPhoneTouched, setClientPhoneTouched] = useState(false);
  const [clientCPFTouched, setClientCPFTouched] = useState(false);
  const [discountTouched, setDiscountTouched] = useState(false);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funções de formatação
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  // Limpa todos os erros
  function clearAllErrors() {
    setClientNameError('');
    setClientEmailError('');
    setClientPhoneError('');
    setClientCPFError('');
    setDiscountError('');
    setSellerError('');
  }

  // Validações individuais em tempo real
  function handleClientNameBlur() {
    setClientNameTouched(true);
    if (clientName.trim()) {
      const error = validateClientName(clientName);
      setClientNameError(error ? error.message : '');
    }
  }

  function handleClientEmailBlur() {
    setClientEmailTouched(true);
    if (clientEmail.trim()) {
      const error = validateClientEmail(clientEmail);
      setClientEmailError(error ? error.message : '');
    }
  }

  function handleClientPhoneBlur() {
    setClientPhoneTouched(true);
    if (clientPhone.trim()) {
      const error = validateClientPhone(clientPhone);
      setClientPhoneError(error ? error.message : '');
    }
  }

  function handleClientCPFBlur() {
    setClientCPFTouched(true);
    if (clientCPF.trim()) {
      const error = validateClientCPF(clientCPF);
      setClientCPFError(error ? error.message : '');
    }
  }

  function handleDiscountBlur() {
    setDiscountTouched(true);
    if (discount) {
      const error = validateDiscount(discount, calculateSubtotal());
      setDiscountError(error ? error.message : '');
    }
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setClientPhone(formatted);
    if (clientPhoneTouched) {
      setClientPhoneError('');
    }
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setClientCPF(formatted);
    if (clientCPFTouched) {
      setClientCPFError('');
    }
  };

  const handleClientNameChange = (value: string) => {
    setClientName(value);
    if (clientNameTouched) {
      setClientNameError('');
    }
  };

  const handleClientEmailChange = (value: string) => {
    setClientEmail(value);
    if (clientEmailTouched) {
      setClientEmailError('');
    }
  };

  const handleSellerSelect = (sellerId: number) => {
    setSelectedSeller(sellerId);
    setIsSellerDropdownOpen(false);
    setSellerError('');
  };

  const getSelectedSellerName = () => {
    const seller = sellers.find(s => s.id === selectedSeller);
    return seller ? seller.name : 'Selecione o vendedor';
  };

  const addToCart = (book: Book) => {
    const existingItem = cart.find(item => item.id === book.id);
    
    if (existingItem) {
      if (existingItem.quantity < book.stock) {
        setCart(cart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const updateQuantity = (bookId: number, newQuantity: number) => {
    const book = books.find(b => b.id === bookId);
    
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    if (book && newQuantity <= book.stock) {
      setCart(cart.map(item =>
        item.id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const discountValue = parseFloat(discount) || 0;
    return discountValue;
  };

  const calculateTotal = () => {
    const total = calculateSubtotal() - calculateDiscount();
    return total < 0 ? 0 : total;
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const hasFormData = () => {
    return cart.length > 0 || clientName || clientEmail || clientPhone || clientCPF || discount || notes || selectedSeller !== null;
  };

  const handleCancelClick = () => {
    if (hasFormData()) {
      setShowCancelModal(true);
    } else {
      router.push('/novavenda');
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push('/novavenda');
  };

  const handleDiscountChange = (value: string) => {
    setDiscount(value);
    if (discountTouched) {
      setDiscountError('');
    }
  };

  const handleFinishClick = () => {
    // Marca todos os campos como tocados
    setClientNameTouched(true);
    setClientEmailTouched(true);
    setClientPhoneTouched(true);
    setClientCPFTouched(true);
    setDiscountTouched(true);

    // Limpa erros anteriores
    clearAllErrors();

    // Valida o vendedor
    if (!selectedSeller) {
      setSellerError('Por favor, selecione o vendedor responsável pela venda');
      return;
    }

    // Valida o formulário completo
    const validationError = validateSaleForm({
      clientName,
      clientEmail,
      clientPhone,
      clientCPF,
      cartLength: cart.length,
      discount,
      subtotal: calculateSubtotal(),
      total: calculateTotal()
    });

    if (validationError) {
      // Define o erro no campo apropriado
      if (validationError.field === 'clientName') {
        setClientNameError(validationError.message);
      } else if (validationError.field === 'clientEmail') {
        setClientEmailError(validationError.message);
      } else if (validationError.field === 'clientPhone') {
        setClientPhoneError(validationError.message);
      } else if (validationError.field === 'clientCPF') {
        setClientCPFError(validationError.message);
      } else if (validationError.field === 'discount') {
        setDiscountError(validationError.message);
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSale = async () => {
    setShowConfirmModal(false);

    const seller = sellers.find(s => s.id === selectedSeller);

    const client = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      cpf: clientCPF
    };
    
    const saleData = {
      client: client,
      seller: seller?.name || '',
      items: cart,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      paymentMethod: paymentMethod,
      notes: notes,
      date: new Date().toISOString()
    };

    try {
      // Gerar PDF do recibo
      const response = await fetch('/api/gerar-recibo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fileName = `recibo-venda-${Date.now()}.pdf`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Enviar email com o recibo (somente se o email foi fornecido)
        if (clientEmail && clientEmail.trim() !== '') {
          try {
            // Converter blob para base64 para enviar no JSON
            const arrayBuffer = await blob.arrayBuffer();
            const base64 = btoa(
              new Uint8Array(arrayBuffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );

            const emailResponse = await fetch('/api/enviar-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                clientEmail: clientEmail,
                clientName: clientName,
                pdfBuffer: base64,
                fileName: fileName
              }),
            });

            if (emailResponse.ok) {
              console.log('Email enviado com sucesso');
            } else {
              console.error('Erro ao enviar email, mas a venda foi concluída');
            }
          } catch (emailError) {
            console.error('Erro ao enviar email:', emailError);
            // Não bloqueia o fluxo se o email falhar
          }
        }

        // Limpar formulário
        setCart([]);
        setClientName('');
        setClientEmail('');
        setClientPhone('');
        setClientCPF('');
        setSelectedSeller(null);
        setPaymentMethod('dinheiro');
        setDiscount('');
        setNotes('');
        clearAllErrors();
        setClientNameTouched(false);
        setClientEmailTouched(false);
        setClientPhoneTouched(false);
        setClientCPFTouched(false);
        setDiscountTouched(false);

        setShowSuccessModal(true);
      } else {
        console.error('Erro ao gerar recibo');
      }
    } catch (error) {
      console.error('Erro ao processar venda:', error);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/novavenda');
  };

  return (
    <Navbar>
      <Container>
        <Header>
          <Title>Nova Venda</Title>
          <Badge>{cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho</Badge>
        </Header>

        <MainContent>
          <LeftPanel>
            <Section>
              <SectionTitle>Dados do Cliente</SectionTitle>
              <FormGroup>
                <Label>Nome Completo *</Label>
                <Input
                  type="text"
                  placeholder="Digite o nome do cliente"
                  value={clientName}
                  onChange={(e) => handleClientNameChange(e.target.value)}
                  onBlur={handleClientNameBlur}
                  $hasError={!!clientNameError}
                />
                {clientNameError && (
                  <FieldError>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {clientNameError}
                  </FieldError>
                )}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Telefone *</Label>
                  <Input
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={clientPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={handleClientPhoneBlur}
                    maxLength={15}
                    $hasError={!!clientPhoneError}
                  />
                  {clientPhoneError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {clientPhoneError}
                    </FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>CPF *</Label>
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={clientCPF}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    onBlur={handleClientCPFBlur}
                    maxLength={14}
                    $hasError={!!clientCPFError}
                  />
                  {clientCPFError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {clientCPFError}
                    </FieldError>
                  )}
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Email (opcional)</Label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={clientEmail}
                  onChange={(e) => handleClientEmailChange(e.target.value)}
                  onBlur={handleClientEmailBlur}
                  $hasError={!!clientEmailError}
                />
                {clientEmailError && (
                  <FieldError>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {clientEmailError}
                  </FieldError>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Vendedor *</Label>
                <SellerDropdown>
                  <SellerButton 
                    onClick={() => setIsSellerDropdownOpen(!isSellerDropdownOpen)}
                    $hasError={!!sellerError}
                  >
                    <span>{getSelectedSellerName()}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={isSellerDropdownOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                    </svg>
                  </SellerButton>
                  
                  {isSellerDropdownOpen && (
                    <SellerList>
                      {sellers.map(seller => (
                        <SellerOption
                          key={seller.id}
                          $active={selectedSeller === seller.id}
                          onClick={() => handleSellerSelect(seller.id)}
                        >
                          {seller.name}
                        </SellerOption>
                      ))}
                    </SellerList>
                  )}
                </SellerDropdown>
                {sellerError && (
                  <FieldError>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {sellerError}
                  </FieldError>
                )}
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>Catálogo de Produtos</SectionTitle>
              <SearchBar>
                <SearchIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </SearchIcon>
                <SearchInput
                  type="text"
                  placeholder="Buscar livros por título, autor ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchBar>

              <ProductGrid>
                {filteredBooks.map(book => (
                  <ProductCard key={book.id}>
                    <ProductImage src={book.cover} alt={book.title} />
                    <ProductInfo>
                      <ProductName>{book.title}</ProductName>
                      <ProductAuthor>{book.author}</ProductAuthor>
                      <ProductPrice>R$ {formatCurrency(book.price)}</ProductPrice>
                      <ProductStock $lowStock={book.stock < 10}>
                        {book.stock < 10 ? '⚠️ ' : '✓ '} Estoque: {book.stock}
                      </ProductStock>
                      <AddButton 
                        onClick={() => addToCart(book)}
                        disabled={book.stock === 0}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1"/>
                          <circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        {book.stock === 0 ? 'Esgotado' : 'Adicionar'}
                      </AddButton>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductGrid>
            </Section>
          </LeftPanel>

          <RightPanel>
            <CartSection>
              <CartHeader>
                <SectionTitle>Resumo da Venda</SectionTitle>
              </CartHeader>

              {cart.length > 0 ? (
                <>
                  <CartItems>
                    {cart.map(item => (
                      <CartItem key={item.id}>
                        <ItemImage src={item.cover} alt={item.title} />
                        <ItemDetails>
                          <ItemName>{item.title}</ItemName>
                          <ItemPrice>R$ {formatCurrency(item.price)} un.</ItemPrice>
                          <QuantityControl>
                            <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              -
                            </QuantityButton>
                            <QuantityDisplay>{item.quantity}</QuantityDisplay>
                            <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              +
                            </QuantityButton>
                          </QuantityControl>
                        </ItemDetails>
                        <div>
                          <div style={{ textAlign: 'right', marginBottom: '8px', fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a' }}>
                            R$ {formatCurrency(item.price * item.quantity)}
                          </div>
                          <RemoveButton onClick={() => removeFromCart(item.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Remover
                          </RemoveButton>
                        </div>
                      </CartItem>
                    ))}
                  </CartItems>

                  <Section>
                    <SectionTitle>Pagamento</SectionTitle>
                    <PaymentMethod>
                      <PaymentOption 
                        $active={paymentMethod === 'dinheiro'}
                        onClick={() => setPaymentMethod('dinheiro')}
                      >
                        💵 Dinheiro
                      </PaymentOption>
                      <PaymentOption 
                        $active={paymentMethod === 'debito'}
                        onClick={() => setPaymentMethod('debito')}
                      >
                        💳 Débito
                      </PaymentOption>
                      <PaymentOption 
                        $active={paymentMethod === 'credito'}
                        onClick={() => setPaymentMethod('credito')}
                      >
                        💳 Crédito
                      </PaymentOption>
                      <PaymentOption 
                        $active={paymentMethod === 'pix'}
                        onClick={() => setPaymentMethod('pix')}
                      >
                        📱 PIX
                      </PaymentOption>
                    </PaymentMethod>
                  </Section>

                  <Section>
                    <FormGroup>
                      <Label>Desconto (R$)</Label>
                      <DiscountInput
                        type="number"
                        step="0.01"
                        min="0"
                        max={calculateSubtotal()}
                        placeholder="0,00"
                        value={discount}
                        onChange={(e) => handleDiscountChange(e.target.value)}
                        onBlur={handleDiscountBlur}
                        $hasError={!!discountError}
                      />
                      {discountError && (
                        <FieldError>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                          {discountError}
                        </FieldError>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Observações</Label>
                      <Notes
                        placeholder="Ex: Cliente solicitou embalagem para presente..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </FormGroup>
                  </Section>

                  <CartSummary>
                    <SummaryRow>
                      <SummaryLabel>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} {cart.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'itens'})</SummaryLabel>
                      <SummaryValue>R$ {formatCurrency(calculateSubtotal())}</SummaryValue>
                    </SummaryRow>
                    {calculateDiscount() > 0 && (
                      <SummaryRow>
                        <SummaryLabel>Desconto</SummaryLabel>
                        <SummaryValue $discount>- R$ {formatCurrency(calculateDiscount())}</SummaryValue>
                      </SummaryRow>
                    )}
                    <TotalRow>
                      <TotalLabel>Total a Pagar</TotalLabel>
                      <TotalValue>R$ {formatCurrency(calculateTotal())}</TotalValue>
                    </TotalRow>
                  </CartSummary>

                  <ActionButtons>
                    <CancelButton onClick={handleCancelClick}>
                      Cancelar
                    </CancelButton>
                    <FinishButton onClick={handleFinishClick}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Finalizar Venda
                    </FinishButton>
                  </ActionButtons>
                </>
              ) : (
                <EmptyCart>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <h3>Carrinho Vazio</h3>
                  <p>Preencha os dados do cliente e adicione produtos para iniciar a venda</p>
                </EmptyCart>
              )}
            </CartSection>
          </RightPanel>
        </MainContent>

        {/* Modais */}
        <CancelModal
          isOpen={showCancelModal}
          title="Cancelar Venda"
          message="Tem certeza que deseja cancelar? Todos os dados da venda e do cliente serão perdidos."
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Confirmar Venda"
          message={`Confirmar venda para ${clientName} no valor de R$ ${formatCurrency(calculateTotal())}?`}
          confirmText="Confirmar/Gerar Recibo"
          cancelText="Revisar"
          onConfirm={handleConfirmSale}
          onCancel={() => setShowConfirmModal(false)}
        />

        <SucessModal
          isOpen={showSuccessModal}
          title="Venda Realizada com Sucesso!"
          message={clientEmail && clientEmail.trim() !== '' 
            ? "A venda foi registrada, o recibo foi gerado e enviado para o email cadastrado."
            : "A venda foi registrada e o recibo foi gerado automaticamente. O download iniciará em instantes."}
          buttonText="Nova Venda"
          onClose={handleSuccessClose}
        />
      </Container>
    </Navbar>
  );
}
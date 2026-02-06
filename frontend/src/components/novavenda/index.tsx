'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import ConfirmModal from '@/components/modals/confirmModal';
import CancelModal from '@/components/modals/cancelModal';
import SucessModal from '@/components/modals/sucessModal';
import ErrorModal from '@/components/modals/errorModal';
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
  FormRow
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

export default function NovaVenda() {
  const router = useRouter();
  const [books] = useState<Book[]>(booksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Dados do cliente
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCPF, setClientCPF] = useState('');
  
  // Dados da venda
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [discount, setDiscount] = useState('');
  const [notes, setNotes] = useState('');
  
  // Modais
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setClientPhone(formatted);
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setClientCPF(formatted);
  };

  const showError = (title: string, message: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setShowErrorModal(true);
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
      } else {
        showError('Estoque Insuficiente', 'Não há estoque suficiente para adicionar mais unidades deste produto.');
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
    } else {
      showError('Estoque Insuficiente', 'A quantidade solicitada excede o estoque disponível para este produto.');
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
    return cart.length > 0 || clientName || clientEmail || clientPhone || clientCPF || discount || notes;
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
    const numValue = parseFloat(value) || 0;
    const subtotal = calculateSubtotal();
    
    if (numValue > subtotal) {
      showError('Desconto Inválido', `O desconto não pode ser maior que o valor total da venda (R$ ${formatCurrency(subtotal)}). O desconto foi ajustado automaticamente.`);
      setDiscount(subtotal.toString());
    } else if (numValue < 0) {
      showError('Desconto Inválido', 'O desconto não pode ser um valor negativo.');
      setDiscount('0');
    } else {
      setDiscount(value);
    }
  };

  const validateForm = (): boolean => {
    // Validar carrinho
    if (cart.length === 0) {
      showError('Carrinho Vazio', 'Adicione ao menos um produto ao carrinho para realizar a venda.');
      return false;
    }

    // Validar nome do cliente
    if (!clientName.trim()) {
      showError('Nome Obrigatório', 'O nome do cliente é obrigatório para finalizar a venda.');
      return false;
    }

    if (clientName.trim().length < 3) {
      showError('Nome Inválido', 'O nome do cliente deve ter pelo menos 3 caracteres.');
      return false;
    }

    // Validar telefone
    if (!clientPhone.trim()) {
      showError('Telefone Obrigatório', 'O telefone do cliente é obrigatório para finalizar a venda.');
      return false;
    }

    const phoneNumbers = clientPhone.replace(/\D/g, '');
    if (phoneNumbers.length < 10) {
      showError('Telefone Inválido', 'Digite um telefone válido com DDD e número completo. Exemplo: (11) 98765-4321');
      return false;
    }

    // Validar CPF
    if (!clientCPF.trim()) {
      showError('CPF Obrigatório', 'O CPF do cliente é obrigatório para finalizar a venda.');
      return false;
    }

    const cpfNumbers = clientCPF.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      showError('CPF Inválido', 'Digite um CPF válido com 11 dígitos. Exemplo: 123.456.789-00');
      return false;
    }

    // Validar email se preenchido
    if (clientEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail)) {
        showError('Email Inválido', 'Digite um endereço de email válido. Exemplo: cliente@exemplo.com');
        return false;
      }
    }

    // Validar desconto
    const discountValue = parseFloat(discount) || 0;
    const subtotal = calculateSubtotal();
    if (discountValue > subtotal) {
      showError('Desconto Inválido', `O desconto (R$ ${formatCurrency(discountValue)}) não pode ser maior que o valor total da venda (R$ ${formatCurrency(subtotal)}).`);
      return false;
    }

    if (discountValue < 0) {
      showError('Desconto Inválido', 'O desconto não pode ser um valor negativo.');
      return false;
    }

    // Validar total
    const total = calculateTotal();
    if (total <= 0) {
      showError('Valor Total Inválido', 'O valor total da venda deve ser maior que zero. Verifique o desconto aplicado.');
      return false;
    }

    return true;
  };

  const handleFinishClick = () => {
    if (!validateForm()) {
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSale = async () => {
    setShowConfirmModal(false);

    const client = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      cpf: clientCPF
    };
    
    const saleData = {
      client: client,
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
        link.download = `recibo-venda-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Limpar formulário
        setCart([]);
        setClientName('');
        setClientEmail('');
        setClientPhone('');
        setClientCPF('');
        setPaymentMethod('dinheiro');
        setDiscount('');
        setNotes('');

        setShowSuccessModal(true);
      } else {
        showError('Erro ao Gerar Recibo', 'Não foi possível gerar o recibo da venda. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao processar venda:', error);
      showError('Erro ao Processar Venda', 'Ocorreu um erro ao processar a venda. Verifique sua conexão com a internet e tente novamente.');
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
                  onChange={(e) => setClientName(e.target.value)}
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Telefone *</Label>
                  <Input
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={clientPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={15}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>CPF *</Label>
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={clientCPF}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    maxLength={14}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Email (opcional)</Label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
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
                      />
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
        <ErrorModal
          isOpen={showErrorModal}
          title={errorTitle}
          message={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />

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
          message="A venda foi registrada e o recibo foi gerado automaticamente. O download iniciará em instantes."
          buttonText="Nova Venda"
          onClose={handleSuccessClose}
        />
      </Container>
    </Navbar>
  );
}
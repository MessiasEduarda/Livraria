'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { listarTodosLivros, listarVendedores, listarClientes, criarCliente, criarVenda, type LivroDTO, type ClienteDTO } from '@/services/api';
import { useConfig } from '@/context/ConfigContext';
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
  validateSeller,
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
  ClientInputWrapper,
  ClientSearchInput,
  ClientTrocarBtn,
  Select,
  SearchBar,
  SearchIcon,
  SearchInput,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductImagePlaceholder,
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
  ItemImagePlaceholder,
  ItemDetails,
  ItemName,
  ItemPrice,
  CartItemTotal,
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
  PaymentDropdownWrapper,
  PaymentDropdownTrigger,
  PaymentDropdownList,
  PaymentDropdownOption,
  DiscountInput,
  Notes,
  FormRow,
  FieldError,
  SellerDropdown,
  SellerButton,
  SellerList,
  SellerOption,
  AddNewClientOption,
  ClientDropdownList,
  ClientDropdownOption
} from './styles';

interface CartItem extends LivroDTO {
  quantity: number;
}

export default function NovaVenda() {
  const router = useRouter();
  const { config } = useConfig();
  const [books, setBooks] = useState<LivroDTO[]>([]);
  const [sellers, setSellers] = useState<{ id: number; nome: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const [clientSearch, setClientSearch] = useState('');
  const [clientSearchResults, setClientSearchResults] = useState<ClienteDTO[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClienteDTO | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCPF, setClientCPF] = useState('');
  
  // Dados da venda
  const [selectedSeller, setSelectedSeller] = useState<number | null>(null);
  const [isSellerDropdownOpen, setIsSellerDropdownOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const paymentDropdownRef = useRef<HTMLDivElement>(null);
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
  const [creatingClient, setCreatingClient] = useState(false);
  const [discountError, setDiscountError] = useState<string>('');
  const [sellerError, setSellerError] = useState<string>('');

  // Estados para controlar se o campo foi tocado
  const [clientNameTouched, setClientNameTouched] = useState(false);
  const [clientEmailTouched, setClientEmailTouched] = useState(false);
  const [clientPhoneTouched, setClientPhoneTouched] = useState(false);
  const [clientCPFTouched, setClientCPFTouched] = useState(false);
  const [discountTouched, setDiscountTouched] = useState(false);
  const [sellerTouched, setSellerTouched] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([listarTodosLivros(), listarVendedores()])
      .then(([livros, vendedores]) => {
        if (!cancelled) {
          setBooks(livros || []);
          setSellers((vendedores || []).map(v => ({ id: v.id, nome: v.nome })));
        }
      })
      .catch(() => {
        if (!cancelled) setBooks([]); setSellers([]);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!clientSearch.trim()) {
      setClientSearchResults([]);
      return;
    }
    const t = setTimeout(() => {
      listarClientes({ nome: clientSearch, page: 0, size: 10 })
        .then(res => setClientSearchResults(res.content || []))
        .catch(() => setClientSearchResults([]));
    }, 300);
    return () => clearTimeout(t);
  }, [clientSearch]);

  useEffect(() => {
    if (!paymentDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(e.target as Node)) {
        setPaymentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [paymentDropdownOpen]);

  const filteredBooks = books.filter(book =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.categoria || '').toLowerCase().includes(searchTerm.toLowerCase())
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

  function handleSellerBlur() {
    setSellerTouched(true);
    const error = validateSeller(selectedSeller);
    setSellerError(error ? error.message : '');
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
    setSellerTouched(true);
    setSellerError('');
  };

  const getSelectedSellerName = () => {
    const seller = sellers.find(s => s.id === selectedSeller);
    return seller ? seller.nome : 'Selecione o vendedor';
  };

  const selectClient = (c: ClienteDTO) => {
    setSelectedClient(c);
    setClientName(c.nome);
    setClientEmail(c.email || '');
    setClientPhone(c.telefone || '');
    setClientCPF(c.cpf || '');
    setClientSearch('');
    setClientSearchResults([]);
  };

  const handleAddNewClient = async () => {
    const nome = clientSearch.trim();
    setClientNameError('');
    setClientPhoneError('');
    setClientCPFError('');
    setClientEmailError('');
    const nameErr = validateClientName(nome);
    if (nameErr) {
      setClientNameError(nameErr.message);
      return;
    }
    const phoneErr = validateClientPhone(clientPhone);
    if (phoneErr) {
      setClientPhoneError(phoneErr.message);
      return;
    }
    const cpfErr = validateClientCPF(clientCPF);
    if (cpfErr) {
      setClientCPFError(cpfErr.message);
      return;
    }
    const emailErr = validateClientEmail(clientEmail);
    if (emailErr) {
      setClientEmailError(emailErr.message);
      return;
    }
    setCreatingClient(true);
    try {
      const novo = await criarCliente({
        nome,
        email: clientEmail.trim() || '',
        telefone: clientPhone,
        cpf: clientCPF
      });
      setSelectedClient(novo);
      setClientName(novo.nome);
      setClientEmail(novo.email || '');
      setClientPhone(novo.telefone || '');
      setClientCPF(novo.cpf || '');
      setClientSearch('');
      setClientSearchResults([]);
    } catch (err) {
      setClientNameError(err instanceof Error ? err.message : 'Erro ao cadastrar cliente.');
    } finally {
      setCreatingClient(false);
    }
  };

  const addToCart = (book: LivroDTO) => {
    const existingItem = cart.find(item => item.id === book.id);
    const stock = book.estoque ?? 0;
    if (existingItem) {
      if (existingItem.quantity < stock) {
        setCart(cart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
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
    const stock = book?.estoque ?? 0;
    if (book && newQuantity <= stock) {
      setCart(cart.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (Number(item.preco) * item.quantity), 0);
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
    return cart.length > 0 || selectedClient || clientName || clientEmail || clientPhone || clientCPF || discount || notes || selectedSeller !== null;
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
    setSellerTouched(true);

    // Limpa erros anteriores
    clearAllErrors();

    if (!selectedClient) {
      setClientNameError('Busque e selecione um cliente da lista.');
      return;
    }
    const validationError = validateSaleForm({
      clientName: selectedClient.nome,
      clientEmail: selectedClient.email || '',
      clientPhone: selectedClient.telefone || '',
      clientCPF: selectedClient.cpf || '',
      cartLength: cart.length,
      discount,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
      sellerId: selectedSeller
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
      } else if (validationError.field === 'seller') {
        setSellerError(validationError.message);
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSale = async () => {
    setShowConfirmModal(false);
    if (!selectedClient || selectedSeller == null) return;

    const seller = sellers.find(s => s.id === selectedSeller);
    const formaPagamentoMap: Record<string, string> = {
      dinheiro: 'DINHEIRO',
      debito: 'DEBITO',
      credito: 'CREDITO',
      pix: 'PIX'
    };

    try {
      await criarVenda({
        clienteId: selectedClient.id,
        vendedorId: selectedSeller,
        itens: cart.map(i => ({ livroId: i.id, quantidade: i.quantity })),
        formaPagamento: formaPagamentoMap[paymentMethod] || 'DINHEIRO',
        desconto: calculateDiscount(),
        observacoes: notes || undefined
      });
    } catch (err) {
      console.error('Erro ao registrar venda:', err);
      setClientNameError(err instanceof Error ? err.message : 'Erro ao registrar venda.');
      return;
    }

    const client = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      cpf: clientCPF
    };
    const saleData = {
      client,
      seller: seller?.nome || '',
      items: cart.map(i => ({ ...i, title: i.titulo, author: i.autor, price: Number(i.preco), cover: i.imagemCapa })),
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      total: calculateTotal(),
      paymentMethod: paymentMethod,
      notes: notes,
      date: new Date().toISOString(),
      storeConfig: {
        storeName: config.storeName,
        storeEmail: config.storeEmail,
        storePhone: config.storePhone,
        storeAddress: config.storeAddress,
      },
    };

    try {
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
                fileName: fileName,
                storeConfig: {
                  storeName: config.storeName,
                  storeEmail: config.storeEmail,
                  storePhone: config.storePhone,
                  storeAddress: config.storeAddress,
                },
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

        setCart([]);
        setSelectedClient(null);
        setClientName('');
        setClientEmail('');
        setClientPhone('');
        setClientCPF('');
        setClientSearch('');
        setClientSearchResults([]);
        setSelectedSeller(null);
        setPaymentMethod('dinheiro');
        setPaymentDropdownOpen(false);
        setDiscount('');
        setNotes('');
        clearAllErrors();
        setClientNameTouched(false);
        setClientEmailTouched(false);
        setClientPhoneTouched(false);
        setClientCPFTouched(false);
        setDiscountTouched(false);
        setSellerTouched(false);

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
              <SectionTitle>Cliente</SectionTitle>
              <FormGroup>
                <Label>Buscar cliente *</Label>
                <ClientInputWrapper>
                  <ClientSearchInput
                    type="text"
                    placeholder="Digite o nome do cliente para buscar..."
                    value={selectedClient ? selectedClient.nome : clientSearch}
                    onChange={(e) => {
                      if (selectedClient) {
                        setSelectedClient(null);
                        setClientName('');
                        setClientEmail('');
                        setClientPhone('');
                        setClientCPF('');
                      }
                      setClientSearch(e.target.value);
                    }}
                    onFocus={() => !selectedClient && clientSearch && setClientSearchResults(clientSearchResults)}
                    readOnly={!!selectedClient}
                    $hasError={!!clientNameError}
                    $withTrocar={!!selectedClient}
                  />
                  {selectedClient && (
                    <ClientTrocarBtn
                      type="button"
                      onClick={() => { setSelectedClient(null); setClientName(''); setClientEmail(''); setClientPhone(''); setClientCPF(''); setClientSearch(''); }}
                    >
                      Trocar
                    </ClientTrocarBtn>
                  )}
                </ClientInputWrapper>
                {(clientSearchResults.length > 0 || (clientSearch.trim().length >= 2 && !selectedClient)) && (
                  <ClientDropdownList>
                    {clientSearchResults.map(c => (
                      <ClientDropdownOption
                        key={c.id}
                        onClick={() => selectClient(c)}
                        role="button"
                      >
                        <div style={{ fontWeight: 600 }}>{c.nome}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2 }}>{c.email}</div>
                      </ClientDropdownOption>
                    ))}
                    {clientSearch.trim().length >= 2 && (
                      <AddNewClientOption
                        role="button"
                        $hasResults={clientSearchResults.length > 0}
                        onClick={creatingClient ? undefined : handleAddNewClient}
                        style={{ cursor: creatingClient ? 'wait' : 'pointer' }}
                      >
                        {creatingClient ? 'Cadastrando...' : `+ Adicionar "${clientSearch.trim()}" como novo cliente`}
                      </AddNewClientOption>
                    )}
                  </ClientDropdownList>
                )}
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
                    onBlur={handleSellerBlur}
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
                          {seller.nome}
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
                {loading ? (
                  <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando livros...</p>
                ) : filteredBooks.map(book => (
                  <ProductCard key={book.id}>
                    {book.imagemCapa ? (
                      <ProductImage src={book.imagemCapa} alt={book.titulo} />
                    ) : (
                      <ProductImagePlaceholder>Sem capa</ProductImagePlaceholder>
                    )}
                    <ProductInfo>
                      <ProductName>{book.titulo}</ProductName>
                      <ProductAuthor>{book.autor}</ProductAuthor>
                      <ProductPrice>R$ {formatCurrency(Number(book.preco))}</ProductPrice>
                      <ProductStock $lowStock={(book.estoque ?? 0) < 10}>
                        {(book.estoque ?? 0) < 10 ? '⚠️ ' : '✓ '} Estoque: {book.estoque ?? 0}
                      </ProductStock>
                      <AddButton 
                        onClick={() => addToCart(book)}
                        disabled={(book.estoque ?? 0) === 0}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1"/>
                          <circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        {(book.estoque ?? 0) === 0 ? 'Esgotado' : 'Adicionar'}
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
                        {item.imagemCapa ? (
                          <ItemImage src={item.imagemCapa} alt={item.titulo} />
                        ) : (
                          <ItemImagePlaceholder>Sem capa</ItemImagePlaceholder>
                        )}
                        <ItemDetails>
                          <ItemName>{item.titulo}</ItemName>
                          <ItemPrice>R$ {formatCurrency(Number(item.preco))} un.</ItemPrice>
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
                          <CartItemTotal>
                            R$ {formatCurrency(Number(item.preco) * item.quantity)}
                          </CartItemTotal>
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
                    <PaymentDropdownWrapper ref={paymentDropdownRef}>
                      <PaymentDropdownTrigger
                        type="button"
                        onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
                        aria-expanded={paymentDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span>
                          {paymentMethod === 'dinheiro' && 'Dinheiro'}
                          {paymentMethod === 'debito' && 'Débito'}
                          {paymentMethod === 'credito' && 'Crédito'}
                          {paymentMethod === 'pix' && 'PIX'}
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                          <path d={paymentDropdownOpen ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
                        </svg>
                      </PaymentDropdownTrigger>
                      {paymentDropdownOpen && (
                        <PaymentDropdownList role="listbox">
                          <PaymentDropdownOption
                            role="option"
                            aria-selected={paymentMethod === 'dinheiro'}
                            onClick={() => { setPaymentMethod('dinheiro'); setPaymentDropdownOpen(false); }}
                          >
                            Dinheiro
                          </PaymentDropdownOption>
                          <PaymentDropdownOption
                            role="option"
                            aria-selected={paymentMethod === 'debito'}
                            onClick={() => { setPaymentMethod('debito'); setPaymentDropdownOpen(false); }}
                          >
                            Débito
                          </PaymentDropdownOption>
                          <PaymentDropdownOption
                            role="option"
                            aria-selected={paymentMethod === 'credito'}
                            onClick={() => { setPaymentMethod('credito'); setPaymentDropdownOpen(false); }}
                          >
                            Crédito
                          </PaymentDropdownOption>
                          <PaymentDropdownOption
                            role="option"
                            aria-selected={paymentMethod === 'pix'}
                            onClick={() => { setPaymentMethod('pix'); setPaymentDropdownOpen(false); }}
                          >
                            PIX
                          </PaymentDropdownOption>
                        </PaymentDropdownList>
                      )}
                    </PaymentDropdownWrapper>
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
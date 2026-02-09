'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import CancelModal from '@/components/modals/cancelModal';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateCPF,
  validateEndereco,
  validateCidade,
  validateEstado,
  validateCEP,
  validateCategory,
  validateClientForm
} from './validation';
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
  AddButton,
  StatsCards,
  StatCard,
  StatIcon,
  StatInfo,
  StatLabel,
  StatValue,
  ClientsTable,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  ClientAvatar,
  ClientDetails,
  ClientName,
  ClientEmail,
  ClientPhone,
  StatusBadge,
  PurchaseCount,
  ActionButtons,
  ActionButton,
  EmptyState,
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
  ModalFooter,
  CancelButton,
  SubmitButton,
  QuickFilters,
  QuickFilterButton,
  FieldError
} from './styles';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'vip';
  purchaseCount: number;
  totalSpent: number;
  registrationDate: string;
  category: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

const clientsData: Client[] = [
  { 
    id: 1, 
    name: "João Silva", 
    email: "joao.silva@email.com", 
    phone: "(11) 98765-4321", 
    status: "vip", 
    purchaseCount: 45, 
    totalSpent: 3850.50,
    registrationDate: "2024-01-15",
    category: "Ficção",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567"
  },
  { 
    id: 2, 
    name: "Maria Santos", 
    email: "maria.santos@email.com", 
    phone: "(11) 97654-3210", 
    status: "active", 
    purchaseCount: 12, 
    totalSpent: 980.90,
    registrationDate: "2024-03-22",
    category: "Tecnologia",
    cpf: "234.567.890-11",
    endereco: "Av. Paulista, 456",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100"
  },
  { 
    id: 3, 
    name: "Pedro Costa", 
    email: "pedro.costa@email.com", 
    phone: "(11) 96543-2109", 
    status: "active", 
    purchaseCount: 28, 
    totalSpent: 2150.30,
    registrationDate: "2023-11-08",
    category: "História",
    cpf: "345.678.901-22",
    endereco: "Rua do Catete, 789",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    cep: "22220-000"
  },
  { 
    id: 4, 
    name: "Ana Oliveira", 
    email: "ana.oliveira@email.com", 
    phone: "(11) 95432-1098", 
    status: "vip", 
    purchaseCount: 67, 
    totalSpent: 5240.80,
    registrationDate: "2023-06-12",
    category: "Fantasia",
    cpf: "456.789.012-33",
    endereco: "Av. Afonso Pena, 321",
    cidade: "Belo Horizonte",
    estado: "MG",
    cep: "30130-001"
  },
  { 
    id: 5, 
    name: "Carlos Mendes", 
    email: "carlos.mendes@email.com", 
    phone: "(11) 94321-0987", 
    status: "active", 
    purchaseCount: 8, 
    totalSpent: 645.20,
    registrationDate: "2025-01-05",
    category: "Tecnologia",
    cpf: "567.890.123-44",
    endereco: "Rua XV de Novembro, 654",
    cidade: "Curitiba",
    estado: "PR",
    cep: "80020-310"
  },
  { 
    id: 6, 
    name: "Juliana Rocha", 
    email: "juliana.rocha@email.com", 
    phone: "(11) 93210-9876", 
    status: "inactive", 
    purchaseCount: 3, 
    totalSpent: 180.50,
    registrationDate: "2024-08-20",
    category: "Autoajuda",
    cpf: "678.901.234-55",
    endereco: "Rua das Acácias, 987",
    cidade: "Porto Alegre",
    estado: "RS",
    cep: "90010-000"
  },
  { 
    id: 7, 
    name: "Roberto Lima", 
    email: "roberto.lima@email.com", 
    phone: "(11) 92109-8765", 
    status: "active", 
    purchaseCount: 19, 
    totalSpent: 1420.70,
    registrationDate: "2024-02-18",
    category: "Filosofia",
    cpf: "789.012.345-66",
    endereco: "Av. Brasil, 555",
    cidade: "Brasília",
    estado: "DF",
    cep: "70040-020"
  },
  { 
    id: 8, 
    name: "Fernanda Alves", 
    email: "fernanda.alves@email.com", 
    phone: "(11) 91098-7654", 
    status: "vip", 
    purchaseCount: 52, 
    totalSpent: 4320.90,
    registrationDate: "2023-09-03",
    category: "Ficção",
    cpf: "890.123.456-77",
    endereco: "Rua da Praia, 222",
    cidade: "Salvador",
    estado: "BA",
    cep: "40020-000"
  },
  { 
    id: 9, 
    name: "Lucas Martins", 
    email: "lucas.martins@email.com", 
    phone: "(11) 90987-6543", 
    status: "active", 
    purchaseCount: 15, 
    totalSpent: 1180.40,
    registrationDate: "2024-07-11",
    category: "Fantasia",
    cpf: "901.234.567-88",
    endereco: "Av. Atlântica, 333",
    cidade: "Fortaleza",
    estado: "CE",
    cep: "60015-000"
  },
  { 
    id: 10, 
    name: "Beatriz Souza", 
    email: "beatriz.souza@email.com", 
    phone: "(11) 89876-5432", 
    status: "inactive", 
    purchaseCount: 2, 
    totalSpent: 95.80,
    registrationDate: "2025-01-28",
    category: "História",
    cpf: "012.345.678-99",
    endereco: "Rua das Palmeiras, 444",
    cidade: "Recife",
    estado: "PE",
    cep: "50010-000"
  },
];

const statusOptions = [
  { label: "Todos", value: "all" },
  { label: "Ativos", value: "active" },
  { label: "VIP", value: "vip" },
  { label: "Inativos", value: "inactive" }
];

const categories = ["Ficção", "Tecnologia", "Fantasia", "História", "Autoajuda", "Filosofia"];
const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

export default function Clientes() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState('all');
  
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    category: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [originalClient, setOriginalClient] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    category: '',
    status: 'active' as 'active' | 'inactive'
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Estados dos modais
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Estados de erro
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [cpfError, setCpfError] = useState<string>('');
  const [enderecoError, setEnderecoError] = useState<string>('');
  const [cidadeError, setCidadeError] = useState<string>('');
  const [estadoError, setEstadoError] = useState<string>('');
  const [cepError, setCepError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');

  // Estados para controlar se o campo foi tocado
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [cpfTouched, setCpfTouched] = useState(false);
  const [enderecoTouched, setEnderecoTouched] = useState(false);
  const [cidadeTouched, setCidadeTouched] = useState(false);
  const [estadoTouched, setEstadoTouched] = useState(false);
  const [cepTouched, setCepTouched] = useState(false);
  const [categoryTouched, setCategoryTouched] = useState(false);

  // Verificar se houve alterações
  useEffect(() => {
    if (isModalOpen) {
      const changed = JSON.stringify(newClient) !== JSON.stringify(originalClient);
      setHasChanges(changed);
    }
  }, [newClient, originalClient, isModalOpen]);

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

  const formatCEP = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  // Limpa todos os erros
  function clearAllErrors() {
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setCpfError('');
    setEnderecoError('');
    setCidadeError('');
    setEstadoError('');
    setCepError('');
    setCategoryError('');
  }

  // Validações individuais em tempo real
  function handleNameBlur() {
    setNameTouched(true);
    if (newClient.name.trim()) {
      const error = validateName(newClient.name);
      setNameError(error ? error.message : '');
    }
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    if (newClient.email.trim()) {
      const error = validateEmail(newClient.email);
      setEmailError(error ? error.message : '');
    }
  }

  function handlePhoneBlur() {
    setPhoneTouched(true);
    if (newClient.phone.trim()) {
      const error = validatePhone(newClient.phone);
      setPhoneError(error ? error.message : '');
    }
  }

  function handleCPFBlur() {
    setCpfTouched(true);
    if (newClient.cpf.trim()) {
      const error = validateCPF(newClient.cpf);
      setCpfError(error ? error.message : '');
    }
  }

  function handleEnderecoBlur() {
    setEnderecoTouched(true);
    if (newClient.endereco.trim()) {
      const error = validateEndereco(newClient.endereco);
      setEnderecoError(error ? error.message : '');
    }
  }

  function handleCidadeBlur() {
    setCidadeTouched(true);
    if (newClient.cidade.trim()) {
      const error = validateCidade(newClient.cidade);
      setCidadeError(error ? error.message : '');
    }
  }

  function handleEstadoBlur() {
    setEstadoTouched(true);
    if (newClient.estado) {
      const error = validateEstado(newClient.estado);
      setEstadoError(error ? error.message : '');
    }
  }

  function handleCEPBlur() {
    setCepTouched(true);
    if (newClient.cep.trim()) {
      const error = validateCEP(newClient.cep);
      setCepError(error ? error.message : '');
    }
  }

  function handleCategoryBlur() {
    setCategoryTouched(true);
    if (newClient.category) {
      const error = validateCategory(newClient.category);
      setCategoryError(error ? error.message : '');
    }
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setNewClient({ ...newClient, phone: formatted });
    if (phoneTouched) {
      setPhoneError('');
    }
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setNewClient({ ...newClient, cpf: formatted });
    if (cpfTouched) {
      setCpfError('');
    }
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    setNewClient({ ...newClient, cep: formatted });
    if (cepTouched) {
      setCepError('');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewClient({ ...newClient, [field]: value });

    // Limpa erro do campo específico se ele foi tocado
    if (field === 'name' && nameTouched) {
      setNameError('');
    } else if (field === 'email' && emailTouched) {
      setEmailError('');
    } else if (field === 'endereco' && enderecoTouched) {
      setEnderecoError('');
    } else if (field === 'cidade' && cidadeTouched) {
      setCidadeError('');
    } else if (field === 'estado' && estadoTouched) {
      setEstadoError('');
    } else if (field === 'category' && categoryTouched) {
      setCategoryError('');
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    let matchesStatus = true;
    if (selectedStatus !== 'all') {
      matchesStatus = client.status === selectedStatus;
    }

    let matchesQuickFilter = true;
    if (quickFilter === 'vip') {
      matchesQuickFilter = client.status === 'vip';
    } else if (quickFilter === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesQuickFilter = new Date(client.registrationDate) >= thirtyDaysAgo;
    } else if (quickFilter === 'top') {
      matchesQuickFilter = client.purchaseCount >= 20;
    }
    
    return matchesSearch && matchesStatus && matchesQuickFilter;
  });

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active' || c.status === 'vip').length;
  const vipClients = clients.filter(c => c.status === 'vip').length;
  const totalRevenue = clients.reduce((acc, client) => acc + client.totalSpent, 0);

  const handleClearFilters = () => {
    setSelectedStatus('all');
    setIsStatusFilterOpen(false);
    setQuickFilter('all');
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const getInitials = (name: string): string => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const isFormFilled = () => {
    return newClient.name || newClient.email || newClient.phone || newClient.cpf || 
           newClient.endereco || newClient.cidade || newClient.estado || newClient.cep || newClient.category;
  };

  const handleCancelClick = () => {
    if (isFormFilled()) {
      setShowCancelModal(true);
    } else {
      handleCloseModal();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    handleCloseModal();
  };

  const handleSubmitClick = () => {
    // Marca todos os campos como tocados
    setNameTouched(true);
    setEmailTouched(true);
    setPhoneTouched(true);
    setCpfTouched(true);
    setEnderecoTouched(true);
    setCidadeTouched(true);
    setEstadoTouched(true);
    setCepTouched(true);
    setCategoryTouched(true);

    // Limpa erros anteriores
    clearAllErrors();

    // Valida o formulário completo
    const validationError = validateClientForm(newClient);

    if (validationError) {
      // Define o erro no campo apropriado
      if (validationError.field === 'name') {
        setNameError(validationError.message);
      } else if (validationError.field === 'email') {
        setEmailError(validationError.message);
      } else if (validationError.field === 'phone') {
        setPhoneError(validationError.message);
      } else if (validationError.field === 'cpf') {
        setCpfError(validationError.message);
      } else if (validationError.field === 'endereco') {
        setEnderecoError(validationError.message);
      } else if (validationError.field === 'cidade') {
        setCidadeError(validationError.message);
      } else if (validationError.field === 'estado') {
        setEstadoError(validationError.message);
      } else if (validationError.field === 'cep') {
        setCepError(validationError.message);
      } else if (validationError.field === 'category') {
        setCategoryError(validationError.message);
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);

    // Simular salvamento
    setTimeout(() => {
      const client: Client = {
        id: clients.length + 1,
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        cpf: newClient.cpf,
        endereco: newClient.endereco,
        cidade: newClient.cidade,
        estado: newClient.estado,
        cep: newClient.cep,
        status: newClient.status,
        purchaseCount: 0,
        totalSpent: 0,
        registrationDate: new Date().toISOString().split('T')[0],
        category: newClient.category
      };

      setClients([...clients, client]);
      setShowSuccessModal(true);
    }, 500);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewClient({ 
      name: '', 
      email: '', 
      phone: '', 
      cpf: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      category: '',
      status: 'active'
    });
    setOriginalClient({
      name: '', 
      email: '', 
      phone: '', 
      cpf: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      category: '',
      status: 'active'
    });
    setHasChanges(false);
    clearAllErrors();
    setNameTouched(false);
    setEmailTouched(false);
    setPhoneTouched(false);
    setCpfTouched(false);
    setEnderecoTouched(false);
    setCidadeTouched(false);
    setEstadoTouched(false);
    setCepTouched(false);
    setCategoryTouched(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    const emptyClient = {
      name: '', 
      email: '', 
      phone: '', 
      cpf: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      category: '',
      status: 'active' as 'active' | 'inactive'
    };
    setNewClient(emptyClient);
    setOriginalClient(emptyClient);
    setHasChanges(false);
  };

  const handleViewDetails = (clientId: number) => {
    router.push(`/clientes/detalhes/${clientId}`);
  };

  const handleEditClient = (clientId: number) => {
    router.push(`/clientes/editar/${clientId}`);
  };

  const hasActiveFilters = selectedStatus !== 'all' || quickFilter !== 'all';

  return (
    <Navbar>
      <Container>
        <Header>
          <Title>Gestão de Clientes</Title>
          <SearchBar>
            <SearchIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </Header>

        <StatsCards>
          <StatCard>
            <StatIcon $color="#0b4200">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </StatIcon>
            <StatInfo>
              <StatLabel>Total de Clientes</StatLabel>
              <StatValue>{totalClients}</StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#28a745">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <polyline points="17 11 19 13 23 9"/>
              </svg>
            </StatIcon>
            <StatInfo>
              <StatLabel>Clientes Ativos</StatLabel>
              <StatValue>{activeClients}</StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#ffc107">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </StatIcon>
            <StatInfo>
              <StatLabel>Clientes VIP</StatLabel>
              <StatValue>{vipClients}</StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#17a2b8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </StatIcon>
            <StatInfo>
              <StatLabel>Receita Total</StatLabel>
              <StatValue>R$ {formatCurrency(totalRevenue)}</StatValue>
            </StatInfo>
          </StatCard>
        </StatsCards>

        <QuickFilters>
          <QuickFilterButton 
            $active={quickFilter === 'all'} 
            onClick={() => setQuickFilter('all')}
          >
            Todos
          </QuickFilterButton>
          <QuickFilterButton 
            $active={quickFilter === 'vip'} 
            onClick={() => setQuickFilter('vip')}
          >
            VIP
          </QuickFilterButton>
          <QuickFilterButton 
            $active={quickFilter === 'recent'} 
            onClick={() => setQuickFilter('recent')}
          >
            Cadastros Recentes
          </QuickFilterButton>
          <QuickFilterButton 
            $active={quickFilter === 'top'} 
            onClick={() => setQuickFilter('top')}
          >
            Melhores Compradores
          </QuickFilterButton>
        </QuickFilters>

        <FilterSection>
          <FilterGroup>
            <FilterDropdown>
              <FilterButton onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}>
                <span>{statusOptions.find(s => s.value === selectedStatus)?.label || 'Status'}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={isStatusFilterOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </FilterButton>
              
              {isStatusFilterOpen && (
                <FilterList>
                  {statusOptions.map(status => (
                    <FilterOption
                      key={status.value}
                      $active={selectedStatus === status.value}
                      onClick={() => {
                        setSelectedStatus(status.value);
                        setIsStatusFilterOpen(false);
                      }}
                    >
                      {status.label}
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

          <AddButton onClick={handleOpenModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Adicionar Cliente
          </AddButton>
        </FilterSection>

        {filteredClients.length > 0 ? (
          <ClientsTable>
            <TableHeader>
              <TableRow $isHeader>
                <TableHeaderCell $width="35%">Cliente</TableHeaderCell>
                <TableHeaderCell $width="20%">Contato</TableHeaderCell>
                <TableHeaderCell $width="15%">Status</TableHeaderCell>
                <TableHeaderCell $width="15%">Compras</TableHeaderCell>
                <TableHeaderCell $width="15%">Ações</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {filteredClients.map(client => (
                <TableRow key={client.id}>
                  <TableCell>
                    <ClientDetails>
                      <ClientAvatar $status={client.status}>
                        {getInitials(client.name)}
                      </ClientAvatar>
                      <div>
                        <ClientName>{client.name}</ClientName>
                        <ClientEmail>{client.email}</ClientEmail>
                      </div>
                    </ClientDetails>
                  </TableCell>
                  <TableCell>
                    <ClientPhone>{client.phone}</ClientPhone>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>
                      Desde {formatDate(client.registrationDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge $status={client.status}>
                      {client.status === 'active' ? 'Ativo' : 
                       client.status === 'vip' ? 'VIP' : 'Inativo'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <PurchaseCount>{client.purchaseCount} compras</PurchaseCount>
                    <div style={{ fontSize: '0.85rem', color: '#0b4200', fontWeight: '600', marginTop: '4px' }}>
                      R$ {formatCurrency(client.totalSpent)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton title="Editar" onClick={() => handleEditClient(client.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </ActionButton>
                      <ActionButton title="Detalhes" onClick={() => handleViewDetails(client.id)}>
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
          </ClientsTable>
        ) : (
          <EmptyState>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h3>Nenhum cliente encontrado</h3>
            <p>Tente ajustar os filtros ou buscar por outro termo</p>
          </EmptyState>
        )}

        {isModalOpen && (
          <Modal>
            <ModalOverlay onClick={handleCancelClick} />
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Adicionar Novo Cliente</ModalTitle>
                <ModalClose onClick={handleCancelClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </ModalClose>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <Label>Nome Completo *</Label>
                  <Input 
                    type="text"
                    placeholder="Digite o nome completo"
                    value={newClient.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={handleNameBlur}
                    $hasError={!!nameError}
                  />
                  {nameError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {nameError}
                    </FieldError>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Email *</Label>
                  <Input 
                    type="email"
                    placeholder="Digite o email"
                    value={newClient.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={handleEmailBlur}
                    $hasError={!!emailError}
                  />
                  {emailError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {emailError}
                    </FieldError>
                  )}
                </FormGroup>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormGroup>
                    <Label>Telefone *</Label>
                    <Input 
                      type="text"
                      placeholder="(00) 00000-0000"
                      value={newClient.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={handlePhoneBlur}
                      maxLength={15}
                      $hasError={!!phoneError}
                    />
                    {phoneError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {phoneError}
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>CPF *</Label>
                    <Input 
                      type="text"
                      placeholder="000.000.000-00"
                      value={newClient.cpf}
                      onChange={(e) => handleCPFChange(e.target.value)}
                      onBlur={handleCPFBlur}
                      maxLength={14}
                      $hasError={!!cpfError}
                    />
                    {cpfError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {cpfError}
                      </FieldError>
                    )}
                  </FormGroup>
                </div>

                <FormGroup>
                  <Label>Endereço *</Label>
                  <Input 
                    type="text"
                    placeholder="Rua, número, complemento"
                    value={newClient.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    onBlur={handleEnderecoBlur}
                    $hasError={!!enderecoError}
                  />
                  {enderecoError && (
                    <FieldError>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {enderecoError}
                    </FieldError>
                  )}
                </FormGroup>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                  <FormGroup>
                    <Label>Cidade *</Label>
                    <Input 
                      type="text"
                      placeholder="Digite a cidade"
                      value={newClient.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      onBlur={handleCidadeBlur}
                      $hasError={!!cidadeError}
                    />
                    {cidadeError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {cidadeError}
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Estado *</Label>
                    <Select 
                      value={newClient.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      onBlur={handleEstadoBlur}
                      $hasError={!!estadoError}
                    >
                      <option value="">UF</option>
                      {estados.map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </Select>
                    {estadoError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {estadoError}
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>CEP *</Label>
                    <Input 
                      type="text"
                      placeholder="00000-000"
                      value={newClient.cep}
                      onChange={(e) => handleCEPChange(e.target.value)}
                      onBlur={handleCEPBlur}
                      maxLength={9}
                      $hasError={!!cepError}
                    />
                    {cepError && (
                      <FieldError>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {cepError}
                      </FieldError>
                    )}
                  </FormGroup>
                </div>

                <FormGroup>
                  <Label>Categoria de Interesse *</Label>
                  <Select 
                    value={newClient.category}
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

                <FormGroup>
                  <Label>Status</Label>
                  <Select 
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value as 'active' | 'inactive' })}
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </Select>
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <CancelButton onClick={handleCancelClick}>Cancelar</CancelButton>
                <SubmitButton onClick={handleSubmitClick}>Adicionar Cliente</SubmitButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Modal de Cancelar Cadastro */}
        <CancelModal
          isOpen={showCancelModal}
          title="Cancelar Cadastro"
          message="Tem certeza que deseja cancelar? Todos os dados preenchidos serão perdidos."
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />

        {/* Modal de Confirmar Cadastro */}
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Confirmar Cadastro"
          message="Deseja realmente cadastrar este cliente?"
          confirmText="Confirmar"
          cancelText="Cancelar"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirmModal(false)}
        />

        {/* Modal de Sucesso */}
        <SucessModal
          isOpen={showSuccessModal}
          title="Cliente Cadastrado!"
          message="O cliente foi cadastrado com sucesso no sistema."
          buttonText="Continuar"
          onClose={handleSuccessClose}
        />
      </Container>
    </Navbar>
  );
}
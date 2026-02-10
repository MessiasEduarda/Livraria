'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import CancelModal from '@/components/modals/cancelModal';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import { buscarCliente, atualizarCliente, type ClienteDTO } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import FormDropdown from '@/components/FormDropdown';
import {
  PageContainer,
  ClientesBackground,
  ClientesContent,
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
  ClientesTable,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  ClienteDetails as TableClienteDetails,
  ClienteAvatar as TableClienteAvatar,
  ClienteName as TableClienteName,
  ClienteEmail as TableClienteEmail,
  StatusBadge as TableStatusBadge,
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
  ModalFooter,
  CancelButton,
  SubmitButton,
  NotFound,
  BackButton
} from './styles';

const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

function mapStatus(s?: string): 'ativo' | 'inativo' | 'vip' {
  if (!s) return 'ativo';
  const lower = s.toLowerCase();
  if (lower === 'vip') return 'vip';
  return lower === 'inativo' || lower === 'inactive' ? 'inativo' : 'ativo';
}

export default function EditarClienteComponent() {
  const params = useParams();
  const router = useRouter();
  const clienteId = parseInt(params.id as string, 10);
  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    status: 'ativo' as 'ativo' | 'inativo' | 'vip'
  });

  const [originalData, setOriginalData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    status: 'ativo' as 'ativo' | 'inativo' | 'vip'
  });

  const { user } = useAuth();
  const isAdmin = user?.admin === true;

  useEffect(() => {
    if (!clienteId || isNaN(clienteId)) {
      setLoading(false);
      return;
    }
    buscarCliente(clienteId)
      .then((c) => {
        setCliente(c);
        const status = mapStatus(c.status);
        const data = {
          nome: c.nome || '',
          email: c.email || '',
          telefone: c.telefone || '',
          cpf: c.cpf || '',
          endereco: c.endereco || '',
          cidade: c.cidade || '',
          estado: c.estado || '',
          cep: c.cep || '',
          status
        };
        setFormData(data);
        setOriginalData(data);
      })
      .catch(() => setCliente(null))
      .finally(() => setLoading(false));
  }, [clienteId]);

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

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, telefone: formatted });
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setFormData({ ...formData, cpf: formatted });
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    setFormData({ ...formData, cep: formatted });
  };

  const handleCancelClick = () => {
    if (hasChanges) {
      setShowCancelModal(true);
    } else {
      router.push('/clientes');
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push('/clientes');
  };

  const handleSubmitClick = () => {
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirmModal(false);
    if (!clienteId || !cliente) return;
    try {
      await atualizarCliente(clienteId, {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: formData.endereco || undefined,
        cidade: formData.cidade || undefined,
        estado: formData.estado || undefined,
        cep: formData.cep || undefined,
        status: formData.status === 'vip' ? 'VIP' : formData.status === 'inativo' ? 'INACTIVE' : 'ACTIVE'
      });
      setShowSuccessModal(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao salvar cliente.');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/clientes');
  };

  const handleClose = () => {
    handleCancelClick();
  };

  if (loading) {
    return (
      <Navbar>
        <PageContainer>
          <ClientesBackground>
            <ClientesContent>
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando cliente...</p>
            </ClientesContent>
          </ClientesBackground>
        </PageContainer>
      </Navbar>
    );
  }

  if (!cliente) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Cliente não encontrado</h1>
            <BackButton onClick={() => router.push('/clientes')}>
              Voltar para Clientes
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <PageContainer>
        <ClientesBackground>
          <ClientesContent>
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
                  placeholder="Buscar por nome ou email..."
                  disabled
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
                  <StatLabel>Editando</StatLabel>
                  <StatValue>{cliente.nome}</StatValue>
                </StatInfo>
              </StatCard>
            </StatsCards>
          </ClientesContent>
        </ClientesBackground>

        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Editar Cliente</ModalTitle>
              <ModalClose onClick={handleClose}>
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
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input 
                  type="email"
                  placeholder="Digite o email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </FormGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormGroup>
                  <Label>Telefone *</Label>
                  <Input 
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={15}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>CPF *</Label>
                  <Input 
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    maxLength={14}
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <Label>Endereço</Label>
                <Input 
                  type="text"
                  placeholder="Rua, número, complemento"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </FormGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                <FormGroup>
                  <Label>Cidade</Label>
                  <Input 
                    type="text"
                    placeholder="Digite a cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Estado</Label>
                  <FormDropdown
                    options={estados.map(uf => ({ value: uf, label: uf }))}
                    value={formData.estado}
                    onChange={(v) => setFormData({ ...formData, estado: v })}
                    placeholder="UF"
                    maxVisibleOptions={5}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>CEP</Label>
                  <Input 
                    type="text"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    maxLength={9}
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <Label>Status</Label>
                <FormDropdown
                  options={[
                    { value: 'ativo', label: 'Ativo' },
                    { value: 'inativo', label: 'Inativo' },
                    ...(isAdmin ? [{ value: 'vip', label: 'VIP' }] : [])
                  ]}
                  value={formData.status}
                  onChange={(v) => setFormData({ ...formData, status: v as 'ativo' | 'inativo' | 'vip' })}
                  placeholder="Status"
                  maxVisibleOptions={3}
                  hidePlaceholderOption
                />
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
          title="Cancelar Edição de Cliente"
          message="Tem certeza que deseja cancelar? Todas as alterações nos dados do cliente serão perdidas."
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />

        {/* Modal de Confirmar Salvamento */}
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Confirmar Alterações"
          message="Deseja realmente salvar as alterações nos dados deste cliente?"
          confirmText="Salvar"
          cancelText="Cancelar"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirmModal(false)}
        />

        {/* Modal de Sucesso */}
        <SucessModal
          isOpen={showSuccessModal}
          title="Cliente Atualizado!"
          message="Os dados do cliente foram atualizados com sucesso no sistema."
          buttonText="Continuar"
          onClose={handleSuccessClose}
        />
      </PageContainer>
    </Navbar>
  );
}
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
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
  Select,
  ModalFooter,
  CancelButton,
  SubmitButton,
  NotFound,
  BackButton
} from './styles';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  dataCadastro: string;
  status: 'ativo' | 'inativo';
  avatar: string;
}

const clientesData: Cliente[] = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "(11) 98765-4321", cpf: "123.456.789-00", endereco: "Rua das Flores, 123", cidade: "São Paulo", estado: "SP", cep: "01234-567", dataCadastro: "15/01/2024", status: "ativo", avatar: "https://ui-avatars.com/api/?name=Ana+Silva&background=0b4200&color=fff&size=200" },
  { id: 2, nome: "Carlos Santos", email: "carlos@email.com", telefone: "(11) 91234-5678", cpf: "234.567.890-11", endereco: "Av. Paulista, 456", cidade: "São Paulo", estado: "SP", cep: "01310-100", dataCadastro: "20/01/2024", status: "ativo", avatar: "https://ui-avatars.com/api/?name=Carlos+Santos&background=0b4200&color=fff&size=200" },
  { id: 3, nome: "Maria Oliveira", email: "maria@email.com", telefone: "(21) 99876-5432", cpf: "345.678.901-22", endereco: "Rua do Catete, 789", cidade: "Rio de Janeiro", estado: "RJ", cep: "22220-000", dataCadastro: "25/01/2024", status: "inativo", avatar: "https://ui-avatars.com/api/?name=Maria+Oliveira&background=0b4200&color=fff&size=200" },
  { id: 4, nome: "João Pereira", email: "joao@email.com", telefone: "(31) 98888-7777", cpf: "456.789.012-33", endereco: "Av. Afonso Pena, 321", cidade: "Belo Horizonte", estado: "MG", cep: "30130-001", dataCadastro: "01/02/2024", status: "ativo", avatar: "https://ui-avatars.com/api/?name=Joao+Pereira&background=0b4200&color=fff&size=200" },
  { id: 5, nome: "Fernanda Costa", email: "fernanda@email.com", telefone: "(41) 97777-6666", cpf: "567.890.123-44", endereco: "Rua XV de Novembro, 654", cidade: "Curitiba", estado: "PR", cep: "80020-310", dataCadastro: "05/02/2024", status: "ativo", avatar: "https://ui-avatars.com/api/?name=Fernanda+Costa&background=0b4200&color=fff&size=200" },
];

const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

export default function EditarClienteComponent() {
  const params = useParams();
  const router = useRouter();
  const clienteId = parseInt(params.id as string);
  
  const cliente = clientesData.find(c => c.id === clienteId);

  const [formData, setFormData] = useState({
    nome: cliente?.nome || '',
    email: cliente?.email || '',
    telefone: cliente?.telefone || '',
    cpf: cliente?.cpf || '',
    endereco: cliente?.endereco || '',
    cidade: cliente?.cidade || '',
    estado: cliente?.estado || '',
    cep: cliente?.cep || '',
    status: cliente?.status || 'ativo'
  });

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

  const handleClose = () => {
    router.push('/clientes');
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    console.log('Cliente atualizado:', formData);
    router.push('/clientes');
  };

  if (!cliente) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Cliente não encontrado</h1>
            <BackButton onClick={handleClose}>
              Voltar para Clientes
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  const totalClientes = clientesData.length;
  const clientesAtivos = clientesData.filter(c => c.status === 'ativo').length;
  const clientesInativos = clientesData.filter(c => c.status === 'inativo').length;

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
                  <StatLabel>Total de Clientes</StatLabel>
                  <StatValue>{totalClientes}</StatValue>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon $color="#28a745">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatLabel>Clientes Ativos</StatLabel>
                  <StatValue>{clientesAtivos}</StatValue>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon $color="#dc3545">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </StatIcon>
                <StatInfo>
                  <StatLabel>Clientes Inativos</StatLabel>
                  <StatValue>{clientesInativos}</StatValue>
                </StatInfo>
              </StatCard>
            </StatsCards>

            <FilterSection>
              <FilterGroup>
                <FilterDropdown>
                  <FilterButton disabled>
                    <span>Status</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </FilterButton>
                </FilterDropdown>
              </FilterGroup>
            </FilterSection>

            <ClientesTable>
              <TableHeader>
                <TableRow $isHeader>
                  <TableHeaderCell $width="35%">Cliente</TableHeaderCell>
                  <TableHeaderCell $width="25%">Telefone</TableHeaderCell>
                  <TableHeaderCell $width="20%">Cidade</TableHeaderCell>
                  <TableHeaderCell $width="15%">Status</TableHeaderCell>
                  <TableHeaderCell $width="5%">Ações</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {clientesData.slice(0, 6).map(c => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <TableClienteDetails>
                        <TableClienteAvatar src={c.avatar} alt={c.nome} />
                        <div>
                          <TableClienteName>{c.nome}</TableClienteName>
                          <TableClienteEmail>{c.email}</TableClienteEmail>
                        </div>
                      </TableClienteDetails>
                    </TableCell>
                    <TableCell>{c.telefone}</TableCell>
                    <TableCell>{c.cidade}/{c.estado}</TableCell>
                    <TableCell>
                      <TableStatusBadge $status={c.status}>
                        {c.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </TableStatusBadge>
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
            </ClientesTable>
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
                  <Select 
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  >
                    <option value="">UF</option>
                    {estados.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </Select>
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
                <Select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ativo' | 'inativo' })}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </Select>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <CancelButton onClick={handleClose}>Cancelar</CancelButton>
              <SubmitButton onClick={handleSubmit}>Salvar Alterações</SubmitButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}
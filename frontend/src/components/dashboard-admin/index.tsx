'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, UserPlus, FileDown, Eye, EyeOff, FileText, Pencil, Lock, LockOpen, Trash2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import { getAdminStats, type AdminStatsDTO } from '@/services/api';
import {
  listarEmpresas,
  buscarEmpresa,
  criarEmpresa,
  atualizarEmpresa,
  ativarEmpresa,
  desativarEmpresa,
  excluirEmpresa,
  listarFaturas,
  gerarFatura,
  marcarFaturaComoPaga,
  type EmpresaDTO,
  type FaturaDTO,
  type CriarFaturaRequest,
} from '@/services/api';
import ConfirmModal from '@/components/modals/confirmModal';
import ErrorModal from '@/components/modals/errorModal';
import SucessModal from '@/components/modals/sucessModal';
import MultiSelectDropdown from '@/components/MultiSelectDropdown';
import Pagination, { PAGE_SIZE_DEFAULT } from '@/components/Pagination';
import {
  Container,
  Header,
  Title,
  Subtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatContent,
  StatLabel,
  StatValue,
  Section,
  SectionHeader,
  SectionTitle,
  SectionActions,
  TableWrap,
  Table,
  Th,
  Td,
  TdEmail,
  Tr,
  Badge,
  ActionBtnGroup,
  ActionBtn,
  IconActionBtn,
  ModalOverlay,
  ModalBox,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  FormGroup,
  FormLabel,
  FormInput,
  FormInputWrapper,
  TogglePasswordBtn,
  FormCheckboxGroup,
  FormCheckboxLabel,
  PrimaryButton,
} from './styles';

const FORMAS_PAGAMENTO_OPCOES = [
  { value: 'DINHEIRO', label: 'Dinheiro' },
  { value: 'PIX', label: 'PIX' },
  { value: 'CREDITO', label: 'Crédito' },
  { value: 'DEBITO', label: 'Débito' },
];

const ACESSOS_OPCOES = [
  { value: 'LIVROS', label: 'Livros' },
  { value: 'ESTOQUE', label: 'Estoque' },
  { value: 'VENDAS', label: 'Vendas e Nova Venda' },
  { value: 'CLIENTES', label: 'Clientes' },
  { value: 'RELATORIOS', label: 'Relatórios' },
  { value: 'DASHBOARD', label: 'Dashboard' },
  { value: 'VENDEDORES', label: 'Vendedores' },
  { value: 'CONFIGURACOES', label: 'Configurações' },
];

/** Apenas dígitos, máx 14. Formato exibição: 00.000.000/0000-00 */
function formatCnpjDisplay(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function validarEmpresa(form: { nome: string; email: string; cnpj: string; senha: string; confirmarSenha: string; permissoes: string[] }, isEdit: boolean) {
  const erros: Record<string, string> = {};
  if (!form.nome.trim()) erros.nome = 'Nome é obrigatório.';
  if (!form.email.trim()) erros.email = 'E-mail é obrigatório.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) erros.email = 'E-mail inválido.';
  const cnpjDigits = form.cnpj.replace(/\D/g, '');
  if (cnpjDigits.length !== 14) erros.cnpj = 'CNPJ deve ter 14 dígitos.';
  if (!isEdit) {
    if (!form.senha) erros.senha = 'Senha é obrigatória para o acesso da empresa.';
    else if (form.senha.length < 6) erros.senha = 'Senha deve ter no mínimo 6 caracteres.';
    if (form.senha !== form.confirmarSenha) erros.confirmarSenha = 'As senhas não coincidem.';
  } else if (form.senha) {
    if (form.senha.length < 6) erros.senha = 'Senha deve ter no mínimo 6 caracteres.';
    if (form.senha !== form.confirmarSenha) erros.confirmarSenha = 'As senhas não coincidem.';
  }
  if (!form.permissoes?.length) erros.permissoes = 'Selecione ao menos um acesso.';
  return erros;
}

export default function DashboardAdminComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<AdminStatsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [empresas, setEmpresas] = useState<EmpresaDTO[]>([]);
  const [empresasLoading, setEmpresasLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [exportandoPdf, setExportandoPdf] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cnpj: '',
    senha: '',
    confirmarSenha: '',
    ativo: true,
    formasPagamento: ['DINHEIRO', 'PIX', 'CREDITO', 'DEBITO'] as string[],
    permissoes: ['LIVROS', 'ESTOQUE', 'VENDAS', 'CLIENTES', 'RELATORIOS', 'DASHBOARD', 'VENDEDORES', 'CONFIGURACOES'] as string[],
    observacoes: '',
  });
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [formErros, setFormErros] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; nome: string } | null>(null);
  const [faturasModalEmpresa, setFaturasModalEmpresa] = useState<{ id: number; nome: string } | null>(null);
  const [faturasList, setFaturasList] = useState<FaturaDTO[]>([]);
  const [faturasLoading, setFaturasLoading] = useState(false);
  const [faturaForm, setFaturaForm] = useState({ valor: '', dataVencimento: '', observacoes: '' });
  const [faturaSubmitting, setFaturaSubmitting] = useState(false);
  const [marcarPagoFaturaId, setMarcarPagoFaturaId] = useState<number | null>(null);
  const [empresasPage, setEmpresasPage] = useState(1);

  const carregarStats = useCallback(async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarEmpresas = useCallback(async () => {
    setEmpresasLoading(true);
    try {
      const list = await listarEmpresas(false);
      setEmpresas(list);
    } catch {
      setErrorMessage('Não foi possível carregar as empresas.');
      setErrorModal(true);
      setEmpresas([]);
    } finally {
      setEmpresasLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarStats();
  }, [carregarStats]);

  useEffect(() => {
    carregarEmpresas();
  }, [carregarEmpresas]);

  useEffect(() => {
    setEmpresasPage(1);
  }, [empresas.length]);

  const editarIdFromUrl = searchParams.get('editar');
  const editarUrlHandled = useRef(false);
  useEffect(() => {
    if (!editarIdFromUrl || empresasLoading || empresas.length === 0 || editarUrlHandled.current) return;
    const id = parseInt(editarIdFromUrl, 10);
    if (!Number.isNaN(id) && empresas.some((e) => e.id === id)) {
      editarUrlHandled.current = true;
      abrirModalEditar(id);
      router.replace('/dashboard-admin', { scroll: false });
    }
  }, [editarIdFromUrl, empresasLoading, empresas.length]);

  useEffect(() => {
    if (!faturasModalEmpresa) return;
    setFaturasLoading(true);
    listarFaturas(faturasModalEmpresa.id)
      .then(setFaturasList)
      .catch(() => {
        setErrorMessage('Não foi possível carregar as faturas.');
        setErrorModal(true);
        setFaturasList([]);
      })
      .finally(() => setFaturasLoading(false));
  }, [faturasModalEmpresa]);

  const abrirFaturasModal = (e: EmpresaDTO) => {
    setFaturasModalEmpresa({ id: e.id, nome: e.nome });
    setFaturaForm({ valor: '', dataVencimento: '', observacoes: '' });
  };

  const fecharFaturasModal = () => {
    setFaturasModalEmpresa(null);
    setFaturasList([]);
  };

  const handleGerarFatura = async () => {
    if (!faturasModalEmpresa) return;
    const valor = parseFloat(faturaForm.valor.replace(',', '.'));
    if (Number.isNaN(valor) || valor <= 0) {
      setErrorMessage('Informe um valor válido.');
      setErrorModal(true);
      return;
    }
    if (!faturaForm.dataVencimento.trim()) {
      setErrorMessage('Informe a data de vencimento.');
      setErrorModal(true);
      return;
    }
    setFaturaSubmitting(true);
    try {
      await gerarFatura(faturasModalEmpresa.id, {
        valor,
        dataVencimento: faturaForm.dataVencimento,
        observacoes: faturaForm.observacoes || undefined,
      });
      setSuccessTitle('Fatura gerada!');
      setSuccessMessage('A fatura foi criada para esta empresa.');
      setSuccessModal(true);
      setFaturaForm({ valor: '', dataVencimento: '', observacoes: '' });
      const list = await listarFaturas(faturasModalEmpresa.id);
      setFaturasList(list);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Erro ao gerar fatura.');
      setErrorModal(true);
    } finally {
      setFaturaSubmitting(false);
    }
  };

  const handleMarcarFaturaPago = async (faturaId: number) => {
    if (!faturasModalEmpresa) return;
    setMarcarPagoFaturaId(faturaId);
    try {
      await marcarFaturaComoPaga(faturasModalEmpresa.id, faturaId);
      const list = await listarFaturas(faturasModalEmpresa.id);
      setFaturasList(list);
      setSuccessTitle('Pagamento registrado!');
      setSuccessMessage('A fatura foi marcada como paga.');
      setSuccessModal(true);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Erro ao marcar fatura.');
      setErrorModal(true);
    } finally {
      setMarcarPagoFaturaId(null);
    }
  };

  const abrirModalNovo = () => {
    setEditingId(null);
    setForm({
      nome: '',
      email: '',
      cnpj: '',
      senha: '',
      confirmarSenha: '',
      ativo: true,
      formasPagamento: ['DINHEIRO', 'PIX', 'CREDITO', 'DEBITO'],
      permissoes: ['LIVROS', 'ESTOQUE', 'VENDAS', 'CLIENTES', 'RELATORIOS', 'DASHBOARD', 'VENDEDORES', 'CONFIGURACOES'],
      observacoes: '',
    });
    setFormErros({});
    setModalAberto(true);
  };

  const abrirModalEditar = async (id: number) => {
    try {
      const e = await buscarEmpresa(id);
      setEditingId(id);
      setForm({
        nome: e.nome,
        email: e.email,
        cnpj: e.cnpj || '',
        senha: '',
        confirmarSenha: '',
        ativo: e.ativo,
        formasPagamento: e.formasPagamento?.length ? e.formasPagamento : ['DINHEIRO', 'PIX', 'CREDITO', 'DEBITO'],
        permissoes: e.permissoes?.length ? e.permissoes : ['LIVROS', 'ESTOQUE', 'VENDAS', 'CLIENTES', 'RELATORIOS', 'DASHBOARD', 'VENDEDORES', 'CONFIGURACOES'],
        observacoes: e.observacoes || '',
      });
      setFormErros({});
      setModalAberto(true);
    } catch {
      setErrorMessage('Não foi possível carregar os dados da empresa.');
      setErrorModal(true);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEditingId(null);
    setFormErros({});
  };

  const handleSubmitEmpresa = async () => {
    const erros = validarEmpresa(form, !!editingId);
    if (Object.keys(erros).length > 0) {
      setFormErros(erros);
      return;
    }
    if (form.formasPagamento.length === 0) {
      setFormErros({ formasPagamento: 'Selecione ao menos uma forma de pagamento.' });
      return;
    }
    setSubmitting(true);
    setFormErros({});
    try {
      const payload: Partial<EmpresaDTO> & { senha?: string } = {
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        cnpj: form.cnpj.trim() || undefined,
        ativo: form.ativo,
        formasPagamento: form.formasPagamento,
        permissoes: form.permissoes,
        observacoes: form.observacoes.trim() || undefined,
      };
      if (!editingId) payload.senha = form.senha;
      else if (form.senha) payload.senha = form.senha;
      if (editingId) {
        await atualizarEmpresa(editingId, payload);
        setSuccessTitle('Atualizado!');
        setSuccessMessage('Empresa atualizada com sucesso.');
      } else {
        await criarEmpresa(payload as Omit<EmpresaDTO, 'id' | 'totalUsuarios'>);
        setSuccessTitle('Empresa cadastrada!');
        setSuccessMessage('A empresa foi cadastrada e já pode acessar o sistema com o e-mail e a senha definidos.');
      }
      setSuccessModal(true);
      fecharModal();
      carregarEmpresas();
      carregarStats();
    } catch (e) {
      setFormErros({ submit: e instanceof Error ? e.message : 'Erro ao salvar empresa.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAtivar = async (id: number) => {
    try {
      await ativarEmpresa(id);
      setSuccessTitle('Ativada!');
      setSuccessMessage('Empresa ativada com sucesso.');
      setSuccessModal(true);
      carregarEmpresas();
      carregarStats();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Erro ao ativar empresa.');
      setErrorModal(true);
    }
  };

  const handleDesativar = async (id: number) => {
    try {
      await desativarEmpresa(id);
      setSuccessTitle('Desativada!');
      setSuccessMessage('A empresa foi desativada.');
      setSuccessModal(true);
      carregarEmpresas();
      carregarStats();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Erro ao desativar empresa.');
      setErrorModal(true);
    }
  };

  const handleExcluir = async () => {
    if (!confirmDelete) return;
    try {
      await excluirEmpresa(confirmDelete.id);
      setSuccessTitle('Excluída!');
      setSuccessMessage('A empresa foi removida do sistema.');
      setSuccessModal(true);
      setConfirmDelete(null);
      carregarEmpresas();
      carregarStats();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Erro ao excluir empresa.');
      setErrorModal(true);
      setConfirmDelete(null);
    }
  };

  const exportarPdf = async () => {
    if (empresas.length === 0) {
      setErrorMessage('Não há dados para exportar.');
      setErrorModal(true);
      return;
    }
    setExportandoPdf(true);
    try {
      const res = await fetch('/api/export-empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empresas }),
      });
      if (!res.ok) throw new Error('Falha ao gerar PDF');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-empresas-${new Date().toISOString().split('T')[0]}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setSuccessTitle('PDF exportado!');
      setSuccessMessage('O relatório de empresas foi gerado e baixado com sucesso.');
      setSuccessModal(true);
    } catch {
      setErrorMessage('Erro ao exportar PDF. Tente novamente.');
      setErrorModal(true);
    } finally {
      setExportandoPdf(false);
    }
  };

  if (loading) {
    return (
      <Navbar>
        <Container>
          <Header>
            <Title>Painel do Sistema</Title>
            <Subtitle>Carregando...</Subtitle>
          </Header>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <Container>
        <Header>
          <Title>Painel do Sistema</Title>
          <Subtitle>Visão geral do sistema de gestão (Super Admin)</Subtitle>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon $color="#3CAD8C">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Empresas no sistema</StatLabel>
              <StatValue>{stats?.totalEmpresas ?? 0}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#2563eb">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Total de clientes</StatLabel>
              <StatValue>{stats?.totalClientes ?? 0}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#7c3aed">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="16" y2="10" />
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Total de livros</StatLabel>
              <StatValue>{stats?.totalLivros ?? 0}</StatValue>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#059669">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Total de vendas</StatLabel>
              <StatValue>{stats?.totalVendas ?? 0}</StatValue>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionHeader>
            <SectionTitle>Gestão de empresas</SectionTitle>
            <SectionActions>
              <PrimaryButton type="button" onClick={exportarPdf} disabled={exportandoPdf}>
                <FileDown size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                {exportandoPdf ? 'Exportando...' : 'Exportar PDF'}
              </PrimaryButton>
              <PrimaryButton type="button" onClick={abrirModalNovo}>
                <UserPlus size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Adicionar empresa
              </PrimaryButton>
            </SectionActions>
          </SectionHeader>
          <TableWrap>
            {empresasLoading ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#6b7280' }}>Carregando empresas...</div>
            ) : empresas.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#6b7280' }}>Nenhuma empresa cadastrada. Adicione uma empresa para começar.</div>
            ) : (
              <>
              <Table>
                <colgroup>
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '28%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '26%', minWidth: '180px' }} />
                </colgroup>
                <thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>E-mail</Th>
                    <Th>CNPJ</Th>
                    <Th>Status</Th>
                    <Th>Ações</Th>
                  </Tr>
                </thead>
                <tbody>
                  {empresas
                    .slice((empresasPage - 1) * PAGE_SIZE_DEFAULT, empresasPage * PAGE_SIZE_DEFAULT)
                    .map((e) => (
                    <Tr key={e.id}>
                      <Td>{e.nome}</Td>
                      <TdEmail title={e.email}>{e.email}</TdEmail>
                      <Td>{e.cnpj ? formatCnpjDisplay(e.cnpj.replace(/\D/g, '')) : '—'}</Td>
                      <Td>
                        <Badge $ativo={e.ativo}>{e.ativo ? 'Ativo' : 'Inativo'}</Badge>
                      </Td>
                      <Td>
                        <ActionBtnGroup>
                          <IconActionBtn type="button" onClick={() => router.push(`/dashboard-admin/empresas/detalhes/${e.id}`)} title="Ver detalhes">
                            <Eye size={18} strokeWidth={2} />
                          </IconActionBtn>
                          <IconActionBtn type="button" onClick={() => abrirFaturasModal(e)} title="Faturas">
                            <FileText size={18} strokeWidth={2} />
                          </IconActionBtn>
                          <IconActionBtn type="button" onClick={() => abrirModalEditar(e.id)} title="Editar">
                            <Pencil size={18} strokeWidth={2} />
                          </IconActionBtn>
                          {e.ativo ? (
                            <IconActionBtn type="button" onClick={() => handleDesativar(e.id)} title="Desativar">
                              <Lock size={18} strokeWidth={2} />
                            </IconActionBtn>
                          ) : (
                            <IconActionBtn type="button" onClick={() => handleAtivar(e.id)} title="Ativar">
                              <LockOpen size={18} strokeWidth={2} />
                            </IconActionBtn>
                          )}
                          <IconActionBtn type="button" onClick={() => setConfirmDelete({ id: e.id, nome: e.nome })} title="Excluir">
                            <Trash2 size={18} strokeWidth={2} />
                          </IconActionBtn>
                        </ActionBtnGroup>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                total={empresas.length}
                pageSize={PAGE_SIZE_DEFAULT}
                currentPage={empresasPage}
                onPageChange={setEmpresasPage}
                itemLabel="empresas"
              />
              </>
            )}
          </TableWrap>
        </Section>

      </Container>

      {modalAberto && (
        <ModalOverlay onClick={fecharModal}>
          <ModalBox onClick={(ev) => ev.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingId ? 'Editar empresa' : 'Adicionar empresa'}</ModalTitle>
              <ModalClose type="button" onClick={fecharModal} aria-label="Fechar">
                <X size={22} />
              </ModalClose>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <FormLabel>Nome *</FormLabel>
                <FormInput
                  type="text"
                  value={form.nome}
                  onChange={(ev) => setForm((f) => ({ ...f, nome: ev.target.value }))}
                  placeholder="Nome da empresa"
                />
                {formErros.nome && <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.nome}</span>}
              </FormGroup>
              <FormGroup>
                <FormLabel>E-mail *</FormLabel>
                <FormInput
                  type="email"
                  value={form.email}
                  onChange={(ev) => setForm((f) => ({ ...f, email: ev.target.value }))}
                  placeholder="contato@empresa.com"
                />
                {formErros.email && <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.email}</span>}
              </FormGroup>
              <FormGroup>
                <FormLabel>CNPJ *</FormLabel>
                <FormInput
                  type="text"
                  inputMode="numeric"
                  value={formatCnpjDisplay(form.cnpj)}
                  onChange={(ev) => {
                    const digits = ev.target.value.replace(/\D/g, '').slice(0, 14);
                    setForm((f) => ({ ...f, cnpj: digits }));
                  }}
                  placeholder="00.000.000/0000-00"
                />
                {formErros.cnpj && <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.cnpj}</span>}
              </FormGroup>
              <FormGroup>
                <FormLabel>{editingId ? 'Nova senha (deixe em branco para manter)' : 'Senha de acesso *'}</FormLabel>
                <FormInputWrapper>
                  <FormInput
                    type={showSenha ? 'text' : 'password'}
                    className="input-with-toggle"
                    value={form.senha}
                    onChange={(ev) => setForm((f) => ({ ...f, senha: ev.target.value }))}
                    placeholder={editingId ? 'Opcional' : 'Mín. 6 caracteres'}
                  />
                  <TogglePasswordBtn type="button" onClick={() => setShowSenha((s) => !s)} aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}>
                    {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                  </TogglePasswordBtn>
                </FormInputWrapper>
                {formErros.senha && <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.senha}</span>}
              </FormGroup>
              {!editingId && (
                <FormGroup>
                  <FormLabel>Confirmar senha *</FormLabel>
                  <FormInputWrapper>
                    <FormInput
                      type={showConfirmarSenha ? 'text' : 'password'}
                      className="input-with-toggle"
                      value={form.confirmarSenha}
                      onChange={(ev) => setForm((f) => ({ ...f, confirmarSenha: ev.target.value }))}
                      placeholder="Repita a senha"
                    />
                    <TogglePasswordBtn type="button" onClick={() => setShowConfirmarSenha((s) => !s)} aria-label={showConfirmarSenha ? 'Ocultar' : 'Mostrar'}>
                      {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TogglePasswordBtn>
                  </FormInputWrapper>
                  {formErros.confirmarSenha && <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.confirmarSenha}</span>}
                </FormGroup>
              )}
              {editingId && form.senha && (
                <FormGroup>
                  <FormLabel>Confirmar nova senha</FormLabel>
                  <FormInputWrapper>
                    <FormInput
                      type={showConfirmarSenha ? 'text' : 'password'}
                      className="input-with-toggle"
                      value={form.confirmarSenha}
                      onChange={(ev) => setForm((f) => ({ ...f, confirmarSenha: ev.target.value }))}
                      placeholder="Repita a nova senha"
                    />
                    <TogglePasswordBtn type="button" onClick={() => setShowConfirmarSenha((s) => !s)} aria-label={showConfirmarSenha ? 'Ocultar' : 'Mostrar'}>
                      {showConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TogglePasswordBtn>
                  </FormInputWrapper>
                  {formErros.confirmarSenha && <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.confirmarSenha}</span>}
                </FormGroup>
              )}
              {editingId && (
                <FormGroup>
                  <FormCheckboxLabel>
                    <input
                      type="checkbox"
                      checked={form.ativo}
                      onChange={(ev) => setForm((f) => ({ ...f, ativo: ev.target.checked }))}
                    />
                    Empresa ativa
                  </FormCheckboxLabel>
                </FormGroup>
              )}
              <FormGroup>
                <FormLabel>Formas de pagamento permitidas</FormLabel>
                <MultiSelectDropdown
                  options={FORMAS_PAGAMENTO_OPCOES}
                  value={form.formasPagamento}
                  onChange={(v) => setForm((f) => ({ ...f, formasPagamento: v }))}
                  placeholder="Selecione as formas de pagamento"
                  hasError={!!formErros.formasPagamento}
                  maxVisibleOptions={3}
                />
                {formErros.formasPagamento && (
                  <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.formasPagamento}</span>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>Acessos permitidos para a empresa</FormLabel>
                <MultiSelectDropdown
                  options={ACESSOS_OPCOES}
                  value={form.permissoes}
                  onChange={(v) => setForm((f) => ({ ...f, permissoes: v }))}
                  placeholder="Selecione os acessos"
                  hasError={!!formErros.permissoes}
                  maxVisibleOptions={4}
                />
                {formErros.permissoes && (
                  <span style={{ color: '#b91c1c', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{formErros.permissoes}</span>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>Observações</FormLabel>
                <FormInput
                  type="text"
                  value={form.observacoes}
                  onChange={(ev) => setForm((f) => ({ ...f, observacoes: ev.target.value }))}
                  placeholder="Opcional"
                />
              </FormGroup>
              {formErros.submit && (
                <div style={{ color: '#b91c1c', fontSize: '0.9rem', marginBottom: 12 }}>{formErros.submit}</div>
              )}
            </ModalBody>
            <ModalFooter>
              <ActionBtn type="button" onClick={fecharModal}>
                Cancelar
              </ActionBtn>
              <PrimaryButton type="button" onClick={handleSubmitEmpresa} disabled={submitting}>
                {submitting ? 'Salvando...' : editingId ? 'Atualizar' : 'Cadastrar'}
              </PrimaryButton>
            </ModalFooter>
          </ModalBox>
        </ModalOverlay>
      )}

      {faturasModalEmpresa && (
        <ModalOverlay onClick={fecharFaturasModal}>
          <ModalBox onClick={(ev) => ev.stopPropagation()} style={{ maxWidth: 560 }}>
            <ModalHeader>
              <ModalTitle>Faturas — {faturasModalEmpresa.nome}</ModalTitle>
              <ModalClose type="button" onClick={fecharFaturasModal} aria-label="Fechar">
                <X size={22} />
              </ModalClose>
            </ModalHeader>
            <ModalBody>
              <div style={{ marginBottom: 20 }}>
                <FormLabel style={{ display: 'block', marginBottom: 8 }}>Gerar nova fatura</FormLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                  <FormGroup style={{ marginBottom: 0 }}>
                    <FormLabel style={{ fontSize: 12 }}>Valor (R$)</FormLabel>
                    <FormInput
                      type="text"
                      inputMode="decimal"
                      value={faturaForm.valor}
                      onChange={(ev) => setFaturaForm((f) => ({ ...f, valor: ev.target.value }))}
                      placeholder="0,00"
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 0 }}>
                    <FormLabel style={{ fontSize: 12 }}>Vencimento</FormLabel>
                    <FormInput
                      type="date"
                      value={faturaForm.dataVencimento}
                      onChange={(ev) => setFaturaForm((f) => ({ ...f, dataVencimento: ev.target.value }))}
                    />
                  </FormGroup>
                  <PrimaryButton type="button" onClick={handleGerarFatura} disabled={faturaSubmitting}>
                    {faturaSubmitting ? 'Gerando...' : 'Gerar'}
                  </PrimaryButton>
                </div>
                <FormGroup style={{ marginTop: 12 }}>
                <FormLabel style={{ fontSize: 12 }}>Observações</FormLabel>
                <FormInput
                  type="text"
                  value={faturaForm.observacoes}
                  onChange={(ev) => setFaturaForm((f) => ({ ...f, observacoes: ev.target.value }))}
                  placeholder="Opcional"
                />
              </FormGroup>
              </div>
              <FormLabel style={{ display: 'block', marginBottom: 8 }}>Histórico de faturas</FormLabel>
              {faturasLoading ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Carregando...</div>
              ) : faturasList.length === 0 ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>Nenhuma fatura cadastrada.</div>
              ) : (
                <div style={{ maxHeight: 280, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8 }}>
                  <Table>
                    <thead>
                      <Tr>
                        <Th style={{ fontSize: 12 }}>Vencimento</Th>
                        <Th style={{ fontSize: 12 }}>Valor</Th>
                        <Th style={{ fontSize: 12 }}>Status</Th>
                        <Th style={{ fontSize: 12 }}>Ação</Th>
                      </Tr>
                    </thead>
                    <tbody>
                      {faturasList.map((f) => (
                        <Tr key={f.id}>
                          <Td style={{ fontSize: 13 }}>{new Date(f.dataVencimento).toLocaleDateString('pt-BR')}</Td>
                          <Td style={{ fontSize: 13 }}>R$ {Number(f.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Td>
                          <Td>
                            <Badge $ativo={f.pago}>{f.pago ? 'Pago' : 'Pendente'}</Badge>
                          </Td>
                          <Td>
                            {!f.pago && (
                              <ActionBtn
                                type="button"
                                onClick={() => handleMarcarFaturaPago(f.id)}
                                disabled={marcarPagoFaturaId === f.id}
                              >
                                {marcarPagoFaturaId === f.id ? '...' : 'Marcar pago'}
                              </ActionBtn>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <PrimaryButton type="button" onClick={fecharFaturasModal}>
                Fechar
              </PrimaryButton>
            </ModalFooter>
          </ModalBox>
        </ModalOverlay>
      )}

      {confirmDelete && (
        <ConfirmModal
          isOpen={true}
          onClose={() => setConfirmDelete(null)}
          onConfirm={handleExcluir}
          title="Excluir empresa"
          message={`Tem certeza que deseja excluir a empresa "${confirmDelete.nome}"? Esta ação não pode ser desfeita.`}
          confirmText="Excluir"
          cancelText="Cancelar"
        />
      )}

      <SucessModal isOpen={successModal} title={successTitle} message={successMessage} onClose={() => setSuccessModal(false)} />
      <ErrorModal isOpen={errorModal} onClose={() => setErrorModal(false)} message={errorMessage} />
    </Navbar>
  );
}

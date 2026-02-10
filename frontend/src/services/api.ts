/**
 * Cliente HTTP para a API do backend (Spring Boot).
 * Configure NEXT_PUBLIC_API_URL no .env.local (ex: http://localhost:8080)
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const token = includeAuth ? getToken() : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    const e = err as { error?: string; message?: string; mensagem?: string; details?: Record<string, string> };
    let msg = e.mensagem || e.error || e.message || res.statusText;
    if (e.details && typeof e.details === 'object') {
      const parts = Object.entries(e.details).map(([k, v]) => `${k}: ${v}`);
      if (parts.length) msg += ' ' + parts.join('; ');
    }
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// --- Auth ---
export interface LoginResponse {
  token: string;
  tipo: string;
  usuarioId: number;
  nome: string;
  email: string;
  admin: boolean;
  /** SUPER_ADMIN | EMPRESA | VENDEDOR */
  tipoUsuario?: string;
  /** Para EMPRESA: acessos permitidos (LIVROS, ESTOQUE, etc.) */
  permissoes?: string[];
  /** Empresa bloqueada por fatura em atraso */
  bloqueado?: boolean;
  /** Mensagem quando bloqueado */
  mensagemBloqueio?: string;
}

export interface AdminStatsDTO {
  totalEmpresas: number;
  totalClientes: number;
  totalLivros: number;
  totalVendas: number;
}

export async function getAdminStats() {
  const res = await fetch(`${API_BASE}/api/admin/stats`, { headers: getHeaders() });
  return handleResponse<AdminStatsDTO>(res);
}

// --- Admin: Empresas ---
export interface EmpresaDTO {
  id: number;
  nome: string;
  email: string;
  cnpj?: string;
  ativo: boolean;
  formasPagamento: string[];
  dataCadastro?: string;
  createdAt?: string;
  observacoes?: string;
  totalUsuarios?: number;
  totalClientes?: number;
  permissoes?: string[];
  /** Apenas envio na criação/atualização; não vem na resposta */
  senha?: string;
}

export async function listarEmpresas(apenasAtivos = false) {
  const res = await fetch(`${API_BASE}/api/admin/empresas?apenasAtivos=${apenasAtivos}`, { headers: getHeaders() });
  return handleResponse<EmpresaDTO[]>(res);
}

export async function relatorioEmpresas() {
  const res = await fetch(`${API_BASE}/api/admin/empresas/relatorio`, { headers: getHeaders() });
  return handleResponse<EmpresaDTO[]>(res);
}

export async function buscarEmpresa(id: number) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${id}`, { headers: getHeaders() });
  return handleResponse<EmpresaDTO>(res);
}

export async function criarEmpresa(dto: Omit<EmpresaDTO, 'id' | 'totalUsuarios'>) {
  const res = await fetch(`${API_BASE}/api/admin/empresas`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dto),
  });
  return handleResponse<EmpresaDTO>(res);
}

export async function atualizarEmpresa(id: number, dto: Partial<EmpresaDTO>) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ ...dto, id }),
  });
  return handleResponse<EmpresaDTO>(res);
}

export async function ativarEmpresa(id: number) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${id}/ativar`, {
    method: 'PATCH',
    headers: getHeaders(),
  });
  return handleResponse<{ mensagem: string }>(res);
}

export async function desativarEmpresa(id: number) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${id}/desativar`, {
    method: 'PATCH',
    headers: getHeaders(),
  });
  return handleResponse<{ mensagem: string }>(res);
}

export async function excluirEmpresa(id: number) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (res.status === 204) return;
  const err = await res.json().catch(() => ({}));
  throw new Error((err as { mensagem?: string }).mensagem || 'Erro ao excluir empresa');
}

export interface FaturaDTO {
  id: number;
  empresaId: number;
  valor: number;
  dataVencimento: string;
  pago: boolean;
  createdAt?: string;
  updatedAt?: string;
  observacoes?: string;
}

export interface CriarFaturaRequest {
  valor: number;
  dataVencimento: string;
  observacoes?: string;
}

export async function listarFaturas(empresaId: number) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${empresaId}/faturas`, { headers: getHeaders() });
  return handleResponse<FaturaDTO[]>(res);
}

export async function gerarFatura(empresaId: number, body: CriarFaturaRequest) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${empresaId}/faturas`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<FaturaDTO>(res);
}

export async function marcarFaturaComoPaga(empresaId: number, faturaId: number) {
  const res = await fetch(`${API_BASE}/api/admin/empresas/${empresaId}/faturas/${faturaId}/pago`, {
    method: 'PATCH',
    headers: getHeaders(),
  });
  return handleResponse<FaturaDTO>(res);
}

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(false),
    body: JSON.stringify({ email, senha }),
  });
  return handleResponse<LoginResponse>(res);
}

// --- Clientes ---
export interface ClienteDTO {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  status?: string;
  quantidadeCompras?: number;
  totalGasto?: number;
  dataCadastro?: string;
  categoriaPreferida?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

export async function listarClientes(params?: { nome?: string; status?: string; categoria?: string; page?: number; size?: number }) {
  const search = new URLSearchParams();
  if (params?.nome) search.set('nome', params.nome);
  if (params?.status) search.set('status', params.status);
  if (params?.categoria) search.set('categoria', params.categoria);
  if (params?.page != null) search.set('page', String(params.page));
  if (params?.size != null) search.set('size', String(params.size));
  const url = `${API_BASE}/api/clientes?${search.toString()}`;
  const res = await fetch(url, { headers: getHeaders() });
  return handleResponse<{ content: ClienteDTO[]; page: number; size: number; totalElements: number; totalPages: number }>(res);
}

export async function buscarCliente(id: number) {
  const res = await fetch(`${API_BASE}/api/clientes/${id}`, { headers: getHeaders() });
  return handleResponse<ClienteDTO>(res);
}

export async function criarCliente(dto: Omit<ClienteDTO, 'id'>) {
  const res = await fetch(`${API_BASE}/api/clientes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dto),
  });
  return handleResponse<ClienteDTO>(res);
}

export async function atualizarCliente(id: number, dto: Partial<ClienteDTO>) {
  const res = await fetch(`${API_BASE}/api/clientes/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ ...dto, id }),
  });
  return handleResponse<ClienteDTO>(res);
}

export async function excluirCliente(id: number) {
  const res = await fetch(`${API_BASE}/api/clientes/${id}`, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || res.statusText);
  }
}

// --- Livros ---
export interface LivroDTO {
  id: number;
  titulo: string;
  autor: string;
  editora?: string;
  ano?: number;
  paginas?: number;
  isbn?: string;
  preco: number;
  estoque: number;
  categoria: string;
  descricao?: string;
  imagemCapa?: string;
  idioma?: string;
  edicao?: number;
}

export async function listarLivros(params?: { busca?: string; categoria?: string; page?: number; size?: number }) {
  const search = new URLSearchParams();
  if (params?.busca) search.set('busca', params.busca);
  if (params?.categoria) search.set('categoria', params.categoria);
  if (params?.page != null) search.set('page', String(params.page));
  if (params?.size != null) search.set('size', String(params.size));
  const res = await fetch(`${API_BASE}/api/livros?${search.toString()}`, { headers: getHeaders() });
  return handleResponse<{ content: LivroDTO[]; page: number; size: number; totalElements: number; totalPages: number }>(res);
}

export async function listarTodosLivros() {
  const res = await fetch(`${API_BASE}/api/livros/todos`, { headers: getHeaders() });
  return handleResponse<LivroDTO[]>(res);
}

export async function estoqueCritico(limite = 10) {
  const res = await fetch(`${API_BASE}/api/livros/estoque-critico?limite=${limite}`, { headers: getHeaders() });
  return handleResponse<LivroDTO[]>(res);
}

export async function buscarLivro(id: number) {
  const res = await fetch(`${API_BASE}/api/livros/${id}`, { headers: getHeaders() });
  return handleResponse<LivroDTO>(res);
}

export async function criarLivro(dto: Omit<LivroDTO, 'id'>) {
  const res = await fetch(`${API_BASE}/api/livros`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dto),
  });
  return handleResponse<LivroDTO>(res);
}

export async function atualizarLivro(id: number, dto: Partial<LivroDTO>) {
  const res = await fetch(`${API_BASE}/api/livros/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ ...dto, id }),
  });
  return handleResponse<LivroDTO>(res);
}

export async function excluirLivro(id: number) {
  const res = await fetch(`${API_BASE}/api/livros/${id}`, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || res.statusText);
  }
}

// --- Categorias (livros) ---
export interface CategoriaDTO {
  id: number;
  nome: string;
}

export async function listarCategorias() {
  const res = await fetch(`${API_BASE}/api/categorias`, { headers: getHeaders() });
  return handleResponse<CategoriaDTO[]>(res);
}

export async function criarCategoria(nome: string) {
  const res = await fetch(`${API_BASE}/api/categorias`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ nome }),
  });
  return handleResponse<CategoriaDTO>(res);
}

export async function excluirCategoria(id: number) {
  const res = await fetch(`${API_BASE}/api/categorias/${id}`, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || res.statusText);
  }
}

// --- Vendas ---
export interface ItemVendaDTO {
  livroId: number;
  bookTitle?: string;
  titulo?: string;
  autor?: string;
  quantidade: number;
  price?: number;
  precoUnitario?: number;
  subtotal?: number;
}

export interface VendaDTO {
  id: number;
  date: string;
  clienteId: number;
  customer: string;
  category?: string;
  items: ItemVendaDTO[];
  total: number;
  status: string;
  desconto?: number;
  formaPagamento?: string;
  observacoes?: string;
  vendedorId?: number;
  seller?: string;
}

export async function listarVendas(params?: {
  dataInicio?: string;
  dataFim?: string;
  status?: string;
  categoria?: string;
  page?: number;
  size?: number;
}) {
  const search = new URLSearchParams();
  if (params?.dataInicio) search.set('dataInicio', params.dataInicio);
  if (params?.dataFim) search.set('dataFim', params.dataFim);
  if (params?.status) search.set('status', params.status);
  if (params?.categoria) search.set('categoria', params.categoria);
  if (params?.page != null) search.set('page', String(params.page));
  if (params?.size != null) search.set('size', String(params.size));
  const res = await fetch(`${API_BASE}/api/vendas?${search.toString()}`, { headers: getHeaders() });
  return handleResponse<{ content: VendaDTO[]; page: number; size: number; totalElements: number; totalPages: number }>(res);
}

export async function buscarVenda(id: number) {
  const res = await fetch(`${API_BASE}/api/vendas/${id}`, { headers: getHeaders() });
  return handleResponse<VendaDTO>(res);
}

export interface NovaVendaRequest {
  clienteId: number;
  vendedorId?: number;
  itens: { livroId: number; quantidade: number }[];
  desconto?: number;
  formaPagamento: string;
  observacoes?: string;
}

export async function criarVenda(req: NovaVendaRequest) {
  const res = await fetch(`${API_BASE}/api/vendas`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(req),
  });
  return handleResponse<VendaDTO>(res);
}

export async function cancelarVenda(id: number) {
  const res = await fetch(`${API_BASE}/api/vendas/${id}/cancelar`, { method: 'POST', headers: getHeaders() });
  return handleResponse<VendaDTO>(res);
}

/** Resumo das vendas do vendedor no período (receita, quantidade, ticket médio). */
export async function resumoMinhasVendas(params?: {
  dataInicio?: string;
  dataFim?: string;
  status?: string;
}) {
  const search = new URLSearchParams();
  if (params?.dataInicio) search.set('dataInicio', params.dataInicio);
  if (params?.dataFim) search.set('dataFim', params.dataFim);
  if (params?.status) search.set('status', params.status);
  const res = await fetch(`${API_BASE}/api/vendas/minhas/resumo?${search.toString()}`, { headers: getHeaders() });
  return handleResponse<{ totalReceita: number; totalVendas: number; ticketMedio: number }>(res);
}

/** Vendas do vendedor logado (controle mensal/anual). Requer autenticação. */
export async function listarMinhasVendas(params?: {
  dataInicio?: string;
  dataFim?: string;
  status?: string;
  page?: number;
  size?: number;
}) {
  const search = new URLSearchParams();
  if (params?.dataInicio) search.set('dataInicio', params.dataInicio);
  if (params?.dataFim) search.set('dataFim', params.dataFim);
  if (params?.status) search.set('status', params.status);
  if (params?.page != null) search.set('page', String(params.page));
  if (params?.size != null) search.set('size', String(params.size));
  const res = await fetch(`${API_BASE}/api/vendas/minhas?${search.toString()}`, { headers: getHeaders() });
  return handleResponse<{ content: VendaDTO[]; page: number; size: number; totalElements: number; totalPages: number }>(res);
}

// --- Dashboard ---
export interface DashboardDTO {
  receitaTotal: number;
  vendasConcluidas: number;
  ticketMedio: number;
  totalItensVendidos: number;
  vendasPorDia: { date: string; vendas: number; pedidos: number }[];
  vendasPorCategoria: { name: string; value: number; percentage: number }[];
  topProdutos: { rank: number; name: string; author: string; category: string; sales: number; revenue: number }[];
  estoqueCritico: LivroDTO[];
}

export async function getDashboard(dias = 7, estoqueCriticoLimite = 10) {
  const res = await fetch(`${API_BASE}/api/dashboard?dias=${dias}&estoqueCriticoLimite=${estoqueCriticoLimite}`, {
    headers: getHeaders(),
  });
  return handleResponse<DashboardDTO>(res);
}

// --- Vendedores ---
export interface UsuarioDTO {
  id: number;
  nome: string;
  email: string;
  ehVendedor: boolean;
}

export interface CriarVendedorRequest {
  nome: string;
  email: string;
  senha: string;
}

export async function listarVendedores() {
  const res = await fetch(`${API_BASE}/api/usuarios/vendedores`, { headers: getHeaders() });
  return handleResponse<UsuarioDTO[]>(res);
}

export async function criarVendedor(data: CriarVendedorRequest) {
  const res = await fetch(`${API_BASE}/api/usuarios/vendedores`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    let msg = res.statusText;
    try {
      const err = JSON.parse(text) as { message?: string; error?: string };
      msg = err.message || err.error || msg;
    } catch {
      if (text) msg = text;
    }
    throw new Error(msg);
  }
  return handleResponse<UsuarioDTO>(res);
}

export async function excluirVendedor(id: number) {
  const res = await fetch(`${API_BASE}/api/usuarios/vendedores/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) {
    const text = await res.text();
    let msg = res.statusText;
    try {
      const err = JSON.parse(text) as { message?: string; error?: string };
      msg = err.message || err.error || msg;
    } catch {
      if (text) msg = text;
    }
    throw new Error(msg);
  }
}

/**
 * Configurações da loja: persistidas em localStorage e usadas no app e nos PDFs/emails.
 */

const STORAGE_KEY = 'gestaolivraria_config';

export interface StoreConfig {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  storeCNPJ: string;
  /** Títulos das páginas (admin edita em Configurações; reflete para todos) */
  pageTitles?: Record<string, string>;
}

export const DEFAULT_PAGE_TITLES: Record<string, string> = {
  home: 'Livros',
  estoque: 'Estoque',
  clientes: 'Clientes',
  vendas: 'Vendas',
  relatorios: 'Relatórios',
  configuracoes: 'Configurações',
  minhasVendas: 'Minhas Vendas',
  dashboard: 'Dashboard',
};

const DEFAULT_CONFIG: StoreConfig = {
  storeName: 'Entre Capítulos',
  storeEmail: 'contato@entrecapitulos.com.br',
  storePhone: '(11) 3456-7890',
  storeAddress: 'Rua dos Livros, 123 - São Paulo, SP',
  storeCNPJ: '12.345.678/0001-90',
  pageTitles: DEFAULT_PAGE_TITLES,
};

export function getConfig(): StoreConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<StoreConfig>;
    const merged = { ...DEFAULT_CONFIG, ...parsed };
    if (!merged.pageTitles) merged.pageTitles = { ...DEFAULT_PAGE_TITLES };
    else merged.pageTitles = { ...DEFAULT_PAGE_TITLES, ...merged.pageTitles };
    return merged;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function setConfig(config: Partial<StoreConfig>): void {
  if (typeof window === 'undefined') return;
  const current = getConfig();
  const next = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

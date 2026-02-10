'use client';

import { useState, useRef, useMemo } from 'react';
import Navbar from '@/components/navbar';
import { useConfig } from '@/context/ConfigContext';
import { listarVendas } from '@/services/api';
import type { VendaDTO } from '@/services/api';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Container, 
  Header,
  Title,
  Subtitle,
  ContentSection,
  ReportTypeSelector,
  ReportTypeCard,
  ReportIcon,
  ReportInfo,
  ReportTitle,
  ReportDescription,
  ReportBadge,
  FiltersPanel,
  FiltersPanelHeader,
  FiltersPanelTitle,
  FilterGroup,
  FilterLabel,
  DateRangeWrapper,
  DateInput,
  Select,
  CheckboxGroup,
  CheckboxLabel,
  CheckboxInput,
  ActionButtons,
  GenerateButton,
  ClearButton,
  PreviewSection,
  PreviewHeader,
  PreviewTitle,
  ExportOptions,
  ExportButton,
  ReportPreview,
  ReportContent,
  ReportHeader as PreviewReportHeader,
  ReportLogo,
  ReportMetadata,
  MetadataItem,
  MetadataLabel,
  MetadataValue,
  ReportSection,
  SectionTitle,
  SectionDivider,
  StatisticsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatChange,
  DataTable,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  ChartContainer,
  ChartTitle,
  ChartWrapper,
  EmptyState,
  LoadingState,
  Spinner,
  QuickActionsPanel,
  QuickActionCard,
  QuickActionIcon,
  QuickActionTitle,
  QuickActionDescription
} from './styles';

interface ReportFilters {
  reportType: string;
  startDate: string;
  endDate: string;
  category: string;
  status: string;
  includeCharts: boolean;
  includeDetails: boolean;
  groupBy: string;
}

const reportTypes = [
  {
    id: 'vendas',
    title: 'Relatório de Vendas',
    description: 'Análise completa de vendas, receitas e performance comercial',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    badge: 'Popular',
    color: '#2a8569'
  },
  {
    id: 'estoque',
    title: 'Relatório de Estoque',
    description: 'Controle de inventário, movimentações e necessidades de reposição',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    badge: 'Essencial',
    color: '#2563eb'
  },
  {
    id: 'clientes',
    title: 'Relatório de Clientes',
    description: 'Análise de comportamento, segmentação e histórico de compras',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    badge: 'Insights',
    color: '#7c3aed'
  },
  {
    id: 'financeiro',
    title: 'Relatório Financeiro',
    description: 'Fluxo de caixa, receitas, despesas e indicadores financeiros',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    badge: 'Completo',
    color: '#dc2626'
  },
  {
    id: 'performance',
    title: 'Relatório de Performance',
    description: 'KPIs, metas, crescimento e análise comparativa de períodos',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    badge: 'Estratégico',
    color: '#059669'
  },
  {
    id: 'produtos',
    title: 'Relatório de Produtos',
    description: 'Best-sellers, produtos em baixa, análise de categorias e tendências',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    badge: 'Detalhado',
    color: '#ea580c'
  }
];

const quickActions = [
  {
    id: 'daily',
    title: 'Resumo Diário',
    description: 'Relatório rápido das vendas de hoje',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  },
  {
    id: 'weekly',
    title: 'Resumo Semanal',
    description: 'Performance dos últimos 7 dias',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01"/>
        <path d="M12 14h.01"/>
        <path d="M16 14h.01"/>
      </svg>
    )
  },
  {
    id: 'monthly',
    title: 'Resumo Mensal',
    description: 'Análise completa do mês atual',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    )
  },
  {
    id: 'custom',
    title: 'Relatório Personalizado',
    description: 'Configure seus próprios parâmetros',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M1 12h6m6 0h6m-13.2 5.2l4.2-4.2m6 0l4.2 4.2"/>
      </svg>
    )
  }
];

export type SaleRow = { date: string; product: string; category: string; quantity: number; unitPrice: number; total: number };

function flattenVendasToRows(vendas: VendaDTO[]): SaleRow[] {
  const rows: SaleRow[] = [];
  for (const v of vendas) {
    const cat = v.category || 'Outros';
    for (const item of v.items || []) {
      const unit = Number(item.precoUnitario ?? item.price ?? 0);
      const total = Number(item.subtotal ?? item.quantidade * unit);
      rows.push({
        date: v.date,
        product: item.titulo || item.bookTitle || 'Produto',
        category: cat,
        quantity: item.quantidade,
        unitPrice: unit,
        total
      });
    }
  }
  return rows;
}

function calculateReportStatsFromVendas(vendas: VendaDTO[]) {
  const totalRevenue = vendas.reduce((sum, v) => sum + Number(v.total), 0);
  const totalSales = vendas.length;
  const totalProducts = vendas.reduce((sum, v) => sum + (v.items || []).reduce((s, i) => s + i.quantidade, 0), 0);
  const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;
  return { totalRevenue, totalSales, averageTicket, totalProducts };
}

export default function Relatorios() {
  const { config } = useConfig();
  const [selectedReportType, setSelectedReportType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [reportVendas, setReportVendas] = useState<VendaDTO[] | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: '',
    startDate: '',
    endDate: '',
    category: 'todas',
    status: 'todos',
    includeCharts: true,
    includeDetails: true,
    groupBy: 'dia'
  });

  const saleRows = useMemo(() => reportVendas ? flattenVendasToRows(reportVendas) : [], [reportVendas]);
  const reportStats = useMemo(() => reportVendas ? calculateReportStatsFromVendas(reportVendas) : { totalRevenue: 0, totalSales: 0, averageTicket: 0, totalProducts: 0 }, [reportVendas]);
  const salesDataByDay = useMemo(() => {
    if (!reportVendas?.length) return [];
    const byDay: Record<string, number> = {};
    for (const v of reportVendas) {
      const d = v.date.split('T')[0];
      byDay[d] = (byDay[d] || 0) + Number(v.total);
    }
    return Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, total]) => ({ name: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), vendas: Math.round(total * 100) / 100 }));
  }, [reportVendas]);
  const categoryData = useMemo(() => {
    if (!saleRows.length) return [];
    const byCat: Record<string, number> = {};
    let sum = 0;
    for (const r of saleRows) {
      byCat[r.category] = (byCat[r.category] || 0) + r.total;
      sum += r.total;
    }
    return Object.entries(byCat).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
      percentage: sum > 0 ? `${Math.round((value / sum) * 100)}%` : '0%'
    }));
  }, [saleRows]);

  const handleReportTypeSelect = (typeId: string) => {
    setSelectedReportType(typeId);
    setFilters({ ...filters, reportType: typeId });
    setShowPreview(false);
  };

  const handleGenerateReport = async () => {
    if (!selectedReportType || !filters.startDate || !filters.endDate) {
      alert('Por favor, selecione o tipo de relatório e o período!');
      return;
    }

    setIsGenerating(true);
    setReportVendas(null);
    try {
      const res = await listarVendas({
        dataInicio: filters.startDate,
        dataFim: filters.endDate,
        size: 500
      });
      setReportVendas(res.content || []);
      setShowPreview(true);
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (e) {
      console.error(e);
      setReportVendas([]);
      setShowPreview(true);
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      reportType: selectedReportType,
      startDate: '',
      endDate: '',
      category: 'todas',
      status: 'todos',
      includeCharts: true,
      includeDetails: true,
      groupBy: 'dia'
    });
    setReportVendas(null);
    setShowPreview(false);
  };

  const handleExportPDF = async () => {
    if (!selectedReportType || !filters.startDate || !filters.endDate) {
      alert('Por favor, gere um relatório antes de exportar!');
      return;
    }

    setIsExporting(true);

    try {
      const selectedReport = reportTypes.find(r => r.id === selectedReportType);
      
      const reportData = {
        reportType: selectedReport?.title || 'Relatório',
        startDate: filters.startDate,
        endDate: filters.endDate,
        category: filters.category === 'todas' ? 'Todas' : filters.category,
        stats: reportStats,
        salesData: saleRows
      };

      const response = await fetch('/api/export-relatorio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format: 'pdf',
          data: reportData,
          storeConfig: {
            storeName: config.storeName,
            storeEmail: config.storeEmail,
            storePhone: config.storePhone,
            storeAddress: config.storeAddress,
          },
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        alert('Erro ao gerar PDF. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectedReport = reportTypes.find(r => r.id === selectedReportType);

  const COLORS = ['#2a8569', '#2563eb', '#7c3aed', '#dc2626', '#ea580c'];

  return (
    <Navbar>
      <Container>
        <Header>
          <div>
            <Title>Central de Relatórios</Title>
            <Subtitle>Gere relatórios personalizados e obtenha insights sobre seu negócio</Subtitle>
          </div>
        </Header>

        <QuickActionsPanel>
          {quickActions.map(action => (
            <QuickActionCard key={action.id}>
              <QuickActionIcon>{action.icon}</QuickActionIcon>
              <div>
                <QuickActionTitle>{action.title}</QuickActionTitle>
                <QuickActionDescription>{action.description}</QuickActionDescription>
              </div>
            </QuickActionCard>
          ))}
        </QuickActionsPanel>

        <ContentSection>
          <SectionTitle>Selecione o Tipo de Relatório</SectionTitle>
          <ReportTypeSelector>
            {reportTypes.map(report => (
              <ReportTypeCard 
                key={report.id}
                $selected={selectedReportType === report.id}
                $color={report.color}
                onClick={() => handleReportTypeSelect(report.id)}
              >
                {report.badge && <ReportBadge>{report.badge}</ReportBadge>}
                <ReportIcon>{report.icon}</ReportIcon>
                <ReportInfo>
                  <ReportTitle>{report.title}</ReportTitle>
                  <ReportDescription>{report.description}</ReportDescription>
                </ReportInfo>
              </ReportTypeCard>
            ))}
          </ReportTypeSelector>
        </ContentSection>

        {selectedReportType && (
          <FiltersPanel>
            <FiltersPanelHeader>
              <FiltersPanelTitle>Configurações do Relatório</FiltersPanelTitle>
            </FiltersPanelHeader>

            <div style={{ padding: '24px' }}>
              <FilterGroup>
                <FilterLabel>Período *</FilterLabel>
                <DateRangeWrapper>
                  <DateInput 
                    type="date" 
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                  <span>até</span>
                  <DateInput 
                    type="date" 
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </DateRangeWrapper>
              </FilterGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <FilterGroup>
                  <FilterLabel>Categoria</FilterLabel>
                  <Select 
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="todas">Todas as Categorias</option>
                    <option value="ficcao">Ficção</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="fantasia">Fantasia</option>
                    <option value="historia">História</option>
                    <option value="autoajuda">Autoajuda</option>
                    <option value="filosofia">Filosofia</option>
                  </Select>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>Agrupar Por</FilterLabel>
                  <Select 
                    value={filters.groupBy}
                    onChange={(e) => setFilters({ ...filters, groupBy: e.target.value })}
                  >
                    <option value="dia">Dia</option>
                    <option value="semana">Semana</option>
                    <option value="mes">Mês</option>
                    <option value="categoria">Categoria</option>
                  </Select>
                </FilterGroup>
              </div>

              <FilterGroup>
                <FilterLabel>Opções de Visualização</FilterLabel>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <CheckboxInput 
                      type="checkbox"
                      checked={filters.includeCharts}
                      onChange={(e) => setFilters({ ...filters, includeCharts: e.target.checked })}
                    />
                    Incluir gráficos e visualizações
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <CheckboxInput 
                      type="checkbox"
                      checked={filters.includeDetails}
                      onChange={(e) => setFilters({ ...filters, includeDetails: e.target.checked })}
                    />
                    Incluir detalhamento completo
                  </CheckboxLabel>
                </CheckboxGroup>
              </FilterGroup>

              <ActionButtons>
                <ClearButton onClick={handleClearFilters}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                  </svg>
                  Limpar Filtros
                </ClearButton>
                <GenerateButton onClick={handleGenerateReport} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Spinner />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Gerar Relatório
                    </>
                  )}
                </GenerateButton>
              </ActionButtons>
            </div>
          </FiltersPanel>
        )}

        {isGenerating && (
          <LoadingState>
            <Spinner />
            <h3>Gerando relatório...</h3>
            <p>Processando dados e preparando visualizações</p>
          </LoadingState>
        )}

        {showPreview && selectedReport && (
          <PreviewSection ref={previewRef}>
            <PreviewHeader>
              <PreviewTitle>Preview do Relatório</PreviewTitle>
              <ExportOptions>
                <ExportButton onClick={handleExportPDF} disabled={isExporting}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  {isExporting ? 'Exportando...' : 'Exportar PDF'}
                </ExportButton>
              </ExportOptions>
            </PreviewHeader>

            <ReportPreview>
              <ReportContent>
                <PreviewReportHeader>
                  <ReportLogo>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    <div>
                      <h1>{config.storeName}</h1>
                      <p>Sistema de Gestão Integrada</p>
                    </div>
                  </ReportLogo>
                  
                  <ReportMetadata>
                    <MetadataItem>
                      <MetadataLabel>Tipo de Relatório</MetadataLabel>
                      <MetadataValue>{selectedReport.title}</MetadataValue>
                    </MetadataItem>
                    <MetadataItem>
                      <MetadataLabel>Período</MetadataLabel>
                      <MetadataValue>
                        {formatDate(filters.startDate)} - {formatDate(filters.endDate)}
                      </MetadataValue>
                    </MetadataItem>
                    <MetadataItem>
                      <MetadataLabel>Data de Geração</MetadataLabel>
                      <MetadataValue>{getCurrentDate()}</MetadataValue>
                    </MetadataItem>
                    <MetadataItem>
                      <MetadataLabel>Categoria</MetadataLabel>
                      <MetadataValue>{filters.category === 'todas' ? 'Todas' : filters.category}</MetadataValue>
                    </MetadataItem>
                  </ReportMetadata>
                </PreviewReportHeader>

                <SectionDivider />

                {reportVendas && reportVendas.length === 0 && (
                  <ReportSection>
                    <div style={{ textAlign: 'center', padding: '32px 24px', background: '#f8f9fa', borderRadius: 12, color: '#666', fontSize: '1rem' }}>
                      Não há vendas para o período selecionado.
                    </div>
                  </ReportSection>
                )}

                <ReportSection>
                  <SectionTitle>Resumo Executivo</SectionTitle>
                  <StatisticsGrid>
                    <StatCard>
                      <StatLabel>Receita Total</StatLabel>
                      <StatValue>R$ {formatCurrency(reportStats.totalRevenue)}</StatValue>
                      </StatCard>
                    <StatCard>
                      <StatLabel>Total de Vendas</StatLabel>
                      <StatValue>{reportStats.totalSales}</StatValue>
                    </StatCard>
                    <StatCard>
                      <StatLabel>Ticket Médio</StatLabel>
                      <StatValue>R$ {formatCurrency(reportStats.averageTicket)}</StatValue>
                    </StatCard>
                    <StatCard>
                      <StatLabel>Produtos Vendidos</StatLabel>
                      <StatValue>{reportStats.totalProducts}</StatValue>
                    </StatCard>
                  </StatisticsGrid>
                </ReportSection>

                {filters.includeCharts && (
                  <ReportSection>
                    <SectionTitle>Análise Gráfica</SectionTitle>
                    
                    <ChartContainer>
                      <ChartTitle>Evolução de Vendas no Período</ChartTitle>
                      <ChartWrapper>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salesDataByDay}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis 
                              dataKey="name" 
                              tick={{ fill: '#666', fontSize: 12 }}
                              axisLine={{ stroke: '#ccc' }}
                            />
                            <YAxis 
                              tick={{ fill: '#666', fontSize: 12 }}
                              axisLine={{ stroke: '#ccc' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#fff', 
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                              }}
                            />
                            <Bar dataKey="vendas" fill="#2a8569" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    </ChartContainer>

                    <ChartContainer>
                      <ChartTitle>Distribuição por Categoria</ChartTitle>
                      <ChartWrapper>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ payload }) => `${payload.name}: ${payload.percentage}`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#fff', 
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    </ChartContainer>
                  </ReportSection>
                )}

                {filters.includeDetails && (
                  <ReportSection>
                    <SectionTitle>Detalhamento de Vendas</SectionTitle>
                    <DataTable>
                      <TableHeader>
                        <TableRow $isHeader>
                          <TableHeaderCell>Data</TableHeaderCell>
                          <TableHeaderCell>Produto</TableHeaderCell>
                          <TableHeaderCell>Categoria</TableHeaderCell>
                          <TableHeaderCell>Quantidade</TableHeaderCell>
                          <TableHeaderCell>Valor Unitário</TableHeaderCell>
                          <TableHeaderCell>Valor Total</TableHeaderCell>
                        </TableRow>
                      </TableHeader>
                      <tbody>
                        {saleRows.map((sale, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(sale.date).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell>{sale.product}</TableCell>
                            <TableCell>{sale.category}</TableCell>
                            <TableCell>{sale.quantity}</TableCell>
                            <TableCell>R$ {formatCurrency(sale.unitPrice)}</TableCell>
                            <TableCell>R$ {formatCurrency(sale.total)}</TableCell>
                          </TableRow>
                        ))}
                      </tbody>
                    </DataTable>
                  </ReportSection>
                )}

                <SectionDivider />

                <ReportSection>
                  <SectionTitle>Conclusões e Recomendações</SectionTitle>
                  <div style={{ 
                    padding: '20px', 
                    backgroundColor: '#f8fdf5', 
                    borderRadius: '12px',
                    borderLeft: '4px solid #2a8569',
                    marginTop: '16px'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 12px 0', 
                      color: '#2a8569',
                      fontFamily: 'var(--font-metropolis-semibold), "Metropolis", sans-serif',
                      fontSize: '1.1rem'
                    }}>
                      Principais Insights:
                    </h4>
                    <ul style={{ 
                      margin: '0', 
                      paddingLeft: '20px',
                      color: '#333',
                      lineHeight: '1.8',
                      fontFamily: 'var(--font-inter-variable-regular), "Inter", sans-serif'
                    }}>
                      <li>Receita total de R$ {formatCurrency(reportStats.totalRevenue)} no período analisado</li>
                      <li>Total de {reportStats.totalSales} vendas realizadas com sucesso</li>
                      <li>Ticket médio de R$ {formatCurrency(reportStats.averageTicket)} por venda</li>
                      <li>Total de {reportStats.totalProducts} produtos vendidos no período</li>
                      <li>Recomenda-se reforço no estoque de best-sellers para evitar rupturas</li>
                    </ul>
                  </div>
                </ReportSection>

                <div style={{ 
                  marginTop: '40px', 
                  paddingTop: '20px', 
                  borderTop: '1px solid #e0e0e0',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-inter-variable-regular), "Inter", sans-serif'
                }}>
                  <p>Relatório gerado automaticamente pelo Sistema de Gestão de Livraria</p>
                  <p>© {new Date().getFullYear()} {config.storeName} - Todos os direitos reservados</p>
                </div>
              </ReportContent>
            </ReportPreview>
          </PreviewSection>
        )}

        {!selectedReportType && !isGenerating && !showPreview && (
          <EmptyState>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <h3>Selecione um tipo de relatório</h3>
            <p>Escolha o tipo de relatório acima e configure os filtros para começar</p>
          </EmptyState>
        )}
      </Container>
    </Navbar>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/navbar';
import EditablePageTitle from '@/components/EditablePageTitle';
import { useConfig } from '@/context/ConfigContext';
import { listarVendas, listarCategorias, type VendaDTO, type ItemVendaDTO, type CategoriaDTO } from '@/services/api';
import { 
  Container, 
  Header,
  Title,
  StatsGrid,
  StatCard,
  StatIcon,
  StatContent,
  StatLabel,
  StatValue,
  StatTrend,
  FilterSection,
  FilterGroup,
  FilterLabel,
  DateRangeWrapper,
  DateInput,
  CategoryFilter,
  CategoryOption,
  SearchBar,
  SearchInput,
  SearchIcon,
  ActionButtons,
  ExportButton,
  RefreshButton,
  SalesGrid,
  SaleCard,
  SaleHeader,
  SaleId,
  SaleDate,
  SaleItems,
  SaleItem,
  ItemInfo,
  ItemName,
  ItemQuantity,
  ItemPrice,
  SaleFooter,
  TotalLabel,
  TotalValue,
  SaleStatus,
  EmptyState,
  QuickFilters,
  QuickFilterButton,
  TimelineView,
  TimelineGroup,
  TimelineDate,
  TimelineCards,
  ViewToggle,
  ViewButton
} from './styles';

function saleStatus(s?: string): 'completed' | 'pending' | 'cancelled' {
  const lower = (s || '').toLowerCase();
  if (lower === 'pending') return 'pending';
  if (lower === 'cancelled' || lower === 'canceled') return 'cancelled';
  return 'completed';
}

function itemTitle(item: ItemVendaDTO): string {
  return item.bookTitle ?? item.titulo ?? '';
}
function itemQty(item: ItemVendaDTO): number {
  return item.quantidade ?? 0;
}
function itemPrice(item: ItemVendaDTO): number {
  return Number(item.price ?? item.precoUnitario ?? 0);
}

export default function Vendas() {
  const { config } = useConfig();
  const [sales, setSales] = useState<VendaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoriaDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  useEffect(() => {
    listarCategorias().then(setCategories).catch(() => setCategories([]));
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const dataInicio = startDate ? `${startDate}T00:00:00` : undefined;
      const dataFim = endDate ? `${endDate}T23:59:59` : undefined;
      const res = await listarVendas({
        dataInicio,
        dataFim,
        categoria: selectedCategory !== 'Todas' ? selectedCategory : undefined,
        page: 0,
        size: 500,
      });
      setSales(res.content || []);
    } catch {
      setSales([]);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, selectedCategory]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Função para formatar números com separador de milhar
  const formatNumber = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getFilteredSales = (): VendaDTO[] => {
    return sales.filter(sale => {
      const matchesSearch = !searchTerm.trim() ||
        (sale.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.id.toString().includes(searchTerm) ||
        (sale.items || []).some(item => itemTitle(item).toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'Todas' || (sale.category || '') === selectedCategory;
      const saleDate = new Date(sale.date);
      const matchesStartDate = !startDate || saleDate >= new Date(startDate);
      const matchesEndDate = !endDate || saleDate <= new Date(endDate + 'T23:59:59');
      let matchesQuickFilter = true;
      if (quickFilter === 'today') {
        matchesQuickFilter = new Date(sale.date).toDateString() === new Date().toDateString();
      } else if (quickFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesQuickFilter = new Date(sale.date) >= weekAgo;
      } else if (quickFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesQuickFilter = new Date(sale.date) >= monthAgo;
      }
      return matchesSearch && matchesCategory && matchesStartDate && matchesEndDate && matchesQuickFilter;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const filteredSales = getFilteredSales();
  const totalRevenue = filteredSales.reduce((sum, s) => sum + Number(s.total), 0);
  const completedSales = filteredSales.filter(s => saleStatus(s.status) === 'completed').length;
  const averageTicket = completedSales > 0 ? totalRevenue / completedSales : 0;
  const totalItems = filteredSales.reduce((sum, s) =>
    sum + (s.items || []).reduce((itemSum, item) => itemSum + itemQty(item), 0), 0
  );
  const stats = { totalRevenue, completedSales, averageTicket, totalItems };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para agrupar vendas por data (timeline)
  const groupSalesByDate = () => {
    const groups: { [key: string]: VendaDTO[] } = {};
    
    filteredSales.forEach(sale => {
      const date = new Date(sale.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(sale);
    });

    return groups;
  };

  const handleExport = async () => {
    // Função para exportar relatório em PDF profissional
    try {
      const response = await fetch('/api/export-vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sales: filteredSales,
          stats: stats,
          filters: {
            category: selectedCategory,
            startDate: startDate,
            endDate: endDate,
            quickFilter: quickFilter
          },
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
        link.download = `relatorio-vendas-${new Date().toISOString().split('T')[0]}.pdf`;
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
    }
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setStartDate('');
    setEndDate('');
    setQuickFilter('all');
  };

  return (
    <Navbar>
      <Container>
        <Header>
          <EditablePageTitle pageKey="vendas" defaultTitle="Vendas">
            {(title) => <Title>{title}</Title>}
          </EditablePageTitle>
          <ViewToggle>
            <ViewButton 
              $active={viewMode === 'grid'} 
              onClick={() => setViewMode('grid')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              Grade
            </ViewButton>
            <ViewButton 
              $active={viewMode === 'timeline'} 
              onClick={() => setViewMode('timeline')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <circle cx="12" cy="6" r="3"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="18" r="3"/>
              </svg>
              Linha do Tempo
            </ViewButton>
          </ViewToggle>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon $color="#3CAD8C">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Receita Total</StatLabel>
              <StatValue>R$ {formatNumber(stats.totalRevenue)}</StatValue>
              <StatTrend $positive={true}>+12.5% vs mês anterior</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#2563eb">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Vendas Concluídas</StatLabel>
              <StatValue>{stats.completedSales}</StatValue>
              <StatTrend $positive={true}>Concluídas</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#7c3aed">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Ticket Médio</StatLabel>
              <StatValue>R$ {formatNumber(stats.averageTicket)}</StatValue>
              <StatTrend $positive={false}>-3.2% vs semana anterior</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#dc2626">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Livros Vendidos</StatLabel>
              <StatValue>{stats.totalItems}</StatValue>
              <StatTrend $positive={true}>+15 unidades hoje</StatTrend>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <QuickFilters>
          <QuickFilterButton 
            $active={quickFilter === 'all'} 
            onClick={() => setQuickFilter('all')}
          >
            Todas
          </QuickFilterButton>
          <QuickFilterButton 
            $active={quickFilter === 'today'} 
            onClick={() => setQuickFilter('today')}
          >
            Hoje
          </QuickFilterButton>
          <QuickFilterButton 
            $active={quickFilter === 'week'} 
            onClick={() => setQuickFilter('week')}
          >
            Última Semana
          </QuickFilterButton>
          <QuickFilterButton 
            $active={quickFilter === 'month'} 
            onClick={() => setQuickFilter('month')}
          >
            Último Mês
          </QuickFilterButton>
        </QuickFilters>

        <FilterSection>
          <FilterGroup>
            <FilterLabel>Período</FilterLabel>
            <DateRangeWrapper>
              <DateInput 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Data inicial"
              />
              <span>até</span>
              <DateInput 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Data final"
              />
            </DateRangeWrapper>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Categoria</FilterLabel>
            <CategoryFilter>
              <CategoryOption
                  key="todas"
                  $active={selectedCategory === 'Todas'}
                  onClick={() => setSelectedCategory('Todas')}
                >
                  Todas
                </CategoryOption>
              {categories.map(cat => (
                <CategoryOption
                  key={cat.id}
                  $active={selectedCategory === cat.nome}
                  onClick={() => setSelectedCategory(cat.nome)}
                >
                  {cat.nome}
                </CategoryOption>
              ))}
            </CategoryFilter>
          </FilterGroup>

          <FilterGroup style={{ flex: 1 }}>
            <FilterLabel>Buscar</FilterLabel>
            <SearchBar>
              <SearchIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </SearchIcon>
              <SearchInput 
                type="text"
                placeholder="Buscar por cliente, ID ou livro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
          </FilterGroup>

          <ActionButtons>
            <RefreshButton onClick={handleRefresh}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
              Limpar
            </RefreshButton>
            <ExportButton onClick={handleExport}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Exportar PDF
            </ExportButton>
          </ActionButtons>
        </FilterSection>

        {loading ? (
          <EmptyState>
            <p>Carregando vendas...</p>
          </EmptyState>
        ) : filteredSales.length > 0 ? (
          viewMode === 'grid' ? (
            <SalesGrid>
              {filteredSales.map(sale => (
                <SaleCard key={sale.id}>
                  <SaleHeader>
                    <SaleId>#{sale.id}</SaleId>
                    <SaleDate>{formatDate(sale.date)}</SaleDate>
                  </SaleHeader>

                  <div style={{ margin: '12px 0 8px 0', fontSize: '0.9rem', color: '#666' }}>
                    <strong>Cliente:</strong> {sale.customer}
                  </div>

                  <SaleItems>
                    {sale.items.map((item, index) => (
                      <SaleItem key={index}>
                        <ItemInfo>
                          <ItemName>{itemTitle(item)}</ItemName>
                          <ItemQuantity>Qtd: {itemQty(item)}</ItemQuantity>
                        </ItemInfo>
                        <ItemPrice>R$ {formatNumber(itemPrice(item) * itemQty(item))}</ItemPrice>
                      </SaleItem>
                    ))}
                  </SaleItems>

                  <SaleFooter>
                    <div>
                      <TotalLabel>Total</TotalLabel>
                      <TotalValue>R$ {formatNumber(sale.total)}</TotalValue>
                    </div>
                    <SaleStatus $status={saleStatus(sale.status)}>
                      {saleStatus(sale.status) === 'completed' ? 'Concluída' :
                       saleStatus(sale.status) === 'pending' ? 'Pendente' : 'Cancelada'}
                    </SaleStatus>
                  </SaleFooter>
                </SaleCard>
              ))}
            </SalesGrid>
          ) : (
            <TimelineView>
              {Object.entries(groupSalesByDate()).map(([date, dateSales]) => (
                <TimelineGroup key={date}>
                  <TimelineDate>{date}</TimelineDate>
                  <TimelineCards>
                    {dateSales.map(sale => (
                      <SaleCard key={sale.id}>
                        <SaleHeader>
                          <SaleId>#{sale.id}</SaleId>
                          <SaleDate>{new Date(sale.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</SaleDate>
                        </SaleHeader>

                        <div style={{ margin: '12px 0 8px 0', fontSize: '0.9rem', color: '#666' }}>
                          <strong>Cliente:</strong> {sale.customer}
                        </div>

                        <SaleItems>
                          {sale.items.map((item, index) => (
                            <SaleItem key={index}>
                              <ItemInfo>
                                <ItemName>{itemTitle(item)}</ItemName>
                                <ItemQuantity>Qtd: {itemQty(item)}</ItemQuantity>
                              </ItemInfo>
                              <ItemPrice>R$ {formatNumber(itemPrice(item) * itemQty(item))}</ItemPrice>
                            </SaleItem>
                          ))}
                        </SaleItems>

                        <SaleFooter>
                          <div>
                            <TotalLabel>Total</TotalLabel>
                            <TotalValue>R$ {formatNumber(sale.total)}</TotalValue>
                          </div>
                          <SaleStatus $status={saleStatus(sale.status)}>
                            {saleStatus(sale.status) === 'completed' ? 'Concluída' :
                             saleStatus(sale.status) === 'pending' ? 'Pendente' : 'Cancelada'}
                          </SaleStatus>
                        </SaleFooter>
                      </SaleCard>
                    ))}
                  </TimelineCards>
                </TimelineGroup>
              ))}
            </TimelineView>
          )
        ) : (
          <EmptyState>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h3>Nenhuma venda encontrada</h3>
            <p>Tente ajustar os filtros ou período selecionado</p>
          </EmptyState>
        )}
      </Container>
    </Navbar>
  );
}
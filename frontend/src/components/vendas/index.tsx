'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
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

interface SaleItem {
  bookTitle: string;
  quantity: number;
  price: number;
}

interface Sale {
  id: number;
  date: string;
  items: SaleItem[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer: string;
  category: string;
}

const salesData: Sale[] = [
  {
    id: 1001,
    date: '2026-02-04T14:30:00',
    customer: 'João Silva',
    category: 'Ficção',
    items: [
      { bookTitle: '1984', quantity: 2, price: 45.90 },
      { bookTitle: 'O Hobbit', quantity: 1, price: 52.90 }
    ],
    total: 144.70,
    status: 'completed'
  },
  {
    id: 1002,
    date: '2026-02-04T10:15:00',
    customer: 'Maria Santos',
    category: 'Tecnologia',
    items: [
      { bookTitle: 'Clean Code', quantity: 1, price: 89.90 }
    ],
    total: 89.90,
    status: 'completed'
  },
  {
    id: 1003,
    date: '2026-02-03T16:45:00',
    customer: 'Pedro Costa',
    category: 'História',
    items: [
      { bookTitle: 'Sapiens', quantity: 3, price: 64.90 }
    ],
    total: 194.70,
    status: 'completed'
  },
  {
    id: 1004,
    date: '2026-02-03T11:20:00',
    customer: 'Ana Oliveira',
    category: 'Fantasia',
    items: [
      { bookTitle: 'Harry Potter', quantity: 2, price: 58.90 },
      { bookTitle: 'O Hobbit', quantity: 1, price: 52.90 }
    ],
    total: 170.70,
    status: 'pending'
  },
  {
    id: 1005,
    date: '2026-02-02T15:00:00',
    customer: 'Carlos Mendes',
    category: 'Tecnologia',
    items: [
      { bookTitle: 'Algoritmos', quantity: 1, price: 125.90 },
      { bookTitle: 'Clean Code', quantity: 1, price: 89.90 }
    ],
    total: 215.80,
    status: 'completed'
  },
  {
    id: 1006,
    date: '2026-02-02T09:30:00',
    customer: 'Juliana Rocha',
    category: 'Autoajuda',
    items: [
      { bookTitle: 'O Poder do Hábito', quantity: 2, price: 42.90 }
    ],
    total: 85.80,
    status: 'completed'
  },
  {
    id: 1007,
    date: '2026-02-01T14:10:00',
    customer: 'Roberto Lima',
    category: 'Filosofia',
    items: [
      { bookTitle: 'A Arte da Guerra', quantity: 3, price: 35.90 }
    ],
    total: 107.70,
    status: 'completed'
  },
  {
    id: 1008,
    date: '2026-02-01T10:50:00',
    customer: 'Fernanda Alves',
    category: 'Ficção',
    items: [
      { bookTitle: '1984', quantity: 1, price: 45.90 }
    ],
    total: 45.90,
    status: 'cancelled'
  },
  {
    id: 1009,
    date: '2026-01-31T16:20:00',
    customer: 'Lucas Martins',
    category: 'Fantasia',
    items: [
      { bookTitle: 'Harry Potter', quantity: 5, price: 58.90 }
    ],
    total: 294.50,
    status: 'completed'
  },
  {
    id: 1010,
    date: '2026-01-31T13:40:00',
    customer: 'Beatriz Souza',
    category: 'História',
    items: [
      { bookTitle: 'Sapiens', quantity: 2, price: 64.90 }
    ],
    total: 129.80,
    status: 'completed'
  }
];

const categories = ['Todas', 'Ficção', 'Tecnologia', 'Fantasia', 'História', 'Autoajuda', 'Filosofia'];

export default function Vendas() {
  const [sales, setSales] = useState<Sale[]>(salesData);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  // Função para calcular estatísticas
  const calculateStats = () => {
    const filteredSales = getFilteredSales();
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    const completedSales = filteredSales.filter(s => s.status === 'completed').length;
    const averageTicket = completedSales > 0 ? totalRevenue / completedSales : 0;
    const totalItems = filteredSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );

    return { totalRevenue, completedSales, averageTicket, totalItems };
  };

  // Função de filtro avançada
  const getFilteredSales = () => {
    return sales.filter(sale => {
      // Filtro de busca
      const matchesSearch = searchTerm === '' || 
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.id.toString().includes(searchTerm) ||
        sale.items.some(item => item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filtro de categoria
      const matchesCategory = selectedCategory === 'Todas' || sale.category === selectedCategory;

      // Filtro de data
      const saleDate = new Date(sale.date);
      const matchesStartDate = !startDate || saleDate >= new Date(startDate);
      const matchesEndDate = !endDate || saleDate <= new Date(endDate + 'T23:59:59');

      // Filtro rápido
      let matchesQuickFilter = true;
      if (quickFilter === 'today') {
        const today = new Date().toDateString();
        matchesQuickFilter = new Date(sale.date).toDateString() === today;
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
  const stats = calculateStats();

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
    const groups: { [key: string]: Sale[] } = {};
    
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

  const handleExport = () => {
    // Função para exportar relatório em CSV
    const csvContent = [
      ['ID', 'Data', 'Cliente', 'Categoria', 'Itens', 'Total', 'Status'],
      ...filteredSales.map(sale => [
        sale.id,
        formatDate(sale.date),
        sale.customer,
        sale.category,
        sale.items.map(item => `${item.bookTitle} (${item.quantity}x)`).join('; '),
        `R$ ${sale.total.toFixed(2)}`,
        sale.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `vendas_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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
          <Title>Histórico de Vendas</Title>
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
            <StatIcon $color="#0b4200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Receita Total</StatLabel>
              <StatValue>R$ {stats.totalRevenue.toFixed(2)}</StatValue>
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
              <StatTrend $positive={true}>+8 vendas hoje</StatTrend>
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
              <StatValue>R$ {stats.averageTicket.toFixed(2)}</StatValue>
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
              {categories.map(category => (
                <CategoryOption
                  key={category}
                  $active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
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
              Exportar CSV
            </ExportButton>
          </ActionButtons>
        </FilterSection>

        {filteredSales.length > 0 ? (
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
                          <ItemName>{item.bookTitle}</ItemName>
                          <ItemQuantity>Qtd: {item.quantity}</ItemQuantity>
                        </ItemInfo>
                        <ItemPrice>R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                      </SaleItem>
                    ))}
                  </SaleItems>

                  <SaleFooter>
                    <div>
                      <TotalLabel>Total</TotalLabel>
                      <TotalValue>R$ {sale.total.toFixed(2)}</TotalValue>
                    </div>
                    <SaleStatus $status={sale.status}>
                      {sale.status === 'completed' ? 'Concluída' : 
                       sale.status === 'pending' ? 'Pendente' : 'Cancelada'}
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
                                <ItemName>{item.bookTitle}</ItemName>
                                <ItemQuantity>Qtd: {item.quantity}</ItemQuantity>
                              </ItemInfo>
                              <ItemPrice>R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                            </SaleItem>
                          ))}
                        </SaleItems>

                        <SaleFooter>
                          <div>
                            <TotalLabel>Total</TotalLabel>
                            <TotalValue>R$ {sale.total.toFixed(2)}</TotalValue>
                          </div>
                          <SaleStatus $status={sale.status}>
                            {sale.status === 'completed' ? 'Concluída' : 
                             sale.status === 'pending' ? 'Pendente' : 'Cancelada'}
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
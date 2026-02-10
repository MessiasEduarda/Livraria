'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { getDashboard, type DashboardDTO } from '@/services/api';
import { 
  Container,
  Header,
  Title,
  DateRange,
  StatsGrid,
  StatCard,
  StatIcon,
  StatContent,
  StatLabel,
  StatValue,
  StatTrend,
  ChartsSection,
  ChartCard,
  ChartHeader,
  ChartTitle,
  ChartPeriod,
  ChartWrapper,
  ActivitySection,
  ActivityHeader,
  ActivityTitle,
  ActivityList,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityTime,
  QuickActionsGrid,
  QuickActionCard,
  QuickActionIcon,
  QuickActionInfo,
  QuickActionTitle,
  QuickActionDescription,
  TopProductsCard,
  ProductItem,
  ProductRank,
  ProductInfo,
  ProductName,
  ProductCategory,
  ProductStats,
  ProductSales,
  ProductRevenue,
  AlertsSection,
  AlertCard,
  AlertIconWrapper,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertAction,
  SectionGrid
} from './styles';

import {
  AreaChart,
  Area,
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

const COLORS = ['#2a8569', '#2563eb', '#7c3aed', '#dc2626', '#ea580c', '#059669'];

export default function MetaMensalComponent() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [dias, setDias] = useState(7);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getDashboard(dias, 10).then((data) => {
      if (!cancelled) {
        setDashboard(data);
      }
    }).catch(() => {
      if (!cancelled) setDashboard(null);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [dias]);

  const salesData = (dashboard?.vendasPorDia || []) as { date: string; vendas: number; pedidos: number }[];
  const categoryData = (dashboard?.vendasPorCategoria || []) as { name: string; value: number; percentage: number }[];
  const topProducts = (dashboard?.topProdutos || []) as { rank: number; name: string; author: string; category: string; sales: number; revenue: number }[];
  const estoqueCritico = dashboard?.estoqueCritico || [];

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString('pt-BR');
  };

  const totalRevenue = Number(dashboard?.receitaTotal ?? 0);
  const totalOrders = Number(dashboard?.vendasConcluidas ?? 0);
  const averageTicket = Number(dashboard?.ticketMedio ?? 0);
  const totalItemsSold = Number(dashboard?.totalItensVendidos ?? 0);

  const alerts = estoqueCritico.length > 0
    ? [{ type: 'warning', title: 'Estoque Crítico', description: `${estoqueCritico.length} produto(s) com estoque baixo`, action: 'Ver Produtos', color: '#dc2626' as const }]
    : [];

  const handleAlertAction = (alertType: string) => {
    if (alertType === 'warning') router.push('/estoque');
  };

  const recentActivities: { type: string; text: string; time: string; icon: React.ReactNode }[] = [];

  if (loading) {
    return (
      <Navbar>
        <Container>
          <Header><Title>Dashboard</Title></Header>
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando...</p>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <Container>
        <Header>
          <div>
            <Title>Dashboard</Title>
            <DateRange>Período: Últimos {dias} dias</DateRange>
          </div>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon $color="#2a8569">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Receita Total</StatLabel>
              <StatValue>R$ {formatCurrency(totalRevenue)}</StatValue>
              <StatTrend $positive={true}>+15.3% vs semana anterior</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#2563eb">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Total de Pedidos</StatLabel>
              <StatValue>{formatNumber(totalOrders)}</StatValue>
              <StatTrend $positive={true}>+12.7% vs semana anterior</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#7c3aed">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Ticket Médio</StatLabel>
              <StatValue>R$ {formatCurrency(averageTicket)}</StatValue>
              <StatTrend $positive={false}>-2.8% vs semana anterior</StatTrend>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon $color="#059669">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </StatIcon>
            <StatContent>
              <StatLabel>Itens Vendidos</StatLabel>
              <StatValue>{formatNumber(totalItemsSold)}</StatValue>
              <StatTrend $positive={true}>Período</StatTrend>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <SectionGrid>
          <ChartsSection>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Evolução de Vendas</ChartTitle>
                <ChartPeriod>Últimos 7 dias</ChartPeriod>
              </ChartHeader>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2a8569" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2a8569" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#d1d5db' }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(1)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        padding: '12px'
                      }}
                      formatter={(value) => `R$ ${formatCurrency(typeof value === 'number' ? value : 0)}`}
                      labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="vendas" 
                      stroke="#2a8569" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorVendas)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>Vendas por Categoria</ChartTitle>
                <ChartPeriod>Última semana</ChartPeriod>
              </ChartHeader>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ payload }) => `${payload.name}: ${payload.percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#ffffff"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        padding: '12px'
                      }}
                      formatter={(value) => `R$ ${formatCurrency(typeof value === 'number' ? value : 0)}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </ChartCard>
          </ChartsSection>

          <ActivitySection>
            <ActivityHeader>
              <ActivityTitle>Atividades Recentes</ActivityTitle>
            </ActivityHeader>
            <ActivityList>
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} $type={activity.type}>
                  <ActivityIcon $type={activity.type}>
                    {activity.icon}
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityText>{activity.text}</ActivityText>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </ActivitySection>
        </SectionGrid>

        <AlertsSection>
          {alerts.map((alert, index) => (
            <AlertCard key={index}>
              <AlertIconWrapper $color={alert.color}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {alert.type === 'warning' && (
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  )}
                  {alert.type === 'info' && (
                    <>
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </>
                  )}
                  {alert.type === 'success' && (
                    <>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </>
                  )}
                </svg>
              </AlertIconWrapper>
              <AlertContent>
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </AlertContent>
              <AlertAction 
                $color={alert.color}
                onClick={() => handleAlertAction(alert.type)}
              >
                {alert.action}
              </AlertAction>
            </AlertCard>
          ))}
        </AlertsSection>

        <SectionGrid>
          <TopProductsCard>
            <ChartHeader>
              <ChartTitle>Top 5 Produtos Mais Vendidos</ChartTitle>
              <ChartPeriod>Última semana</ChartPeriod>
            </ChartHeader>
            <div style={{ marginTop: '20px' }}>
              {topProducts.map((product) => (
                <ProductItem key={product.rank}>
                  <ProductRank $rank={product.rank}>#{product.rank}</ProductRank>
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductCategory>{product.author} • {product.category}</ProductCategory>
                  </ProductInfo>
                  <ProductStats>
                    <ProductSales>{product.sales} vendas</ProductSales>
                    <ProductRevenue>R$ {formatCurrency(product.revenue)}</ProductRevenue>
                  </ProductStats>
                </ProductItem>
              ))}
            </div>
          </TopProductsCard>

          <QuickActionsGrid>
            <QuickActionCard>
              <QuickActionIcon $color="#2a8569">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </QuickActionIcon>
              <QuickActionInfo>
                <QuickActionTitle>Nova Venda</QuickActionTitle>
                <QuickActionDescription>Registrar uma nova venda</QuickActionDescription>
              </QuickActionInfo>
            </QuickActionCard>

            <QuickActionCard>
              <QuickActionIcon $color="#2563eb">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </QuickActionIcon>
              <QuickActionInfo>
                <QuickActionTitle>Adicionar Livro</QuickActionTitle>
                <QuickActionDescription>Cadastrar novo produto</QuickActionDescription>
              </QuickActionInfo>
            </QuickActionCard>

            <QuickActionCard>
              <QuickActionIcon $color="#7c3aed">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              </QuickActionIcon>
              <QuickActionInfo>
                <QuickActionTitle>Novo Cliente</QuickActionTitle>
                <QuickActionDescription>Cadastrar novo cliente</QuickActionDescription>
              </QuickActionInfo>
            </QuickActionCard>

            <QuickActionCard>
              <QuickActionIcon $color="#dc2626">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </QuickActionIcon>
              <QuickActionInfo>
                <QuickActionTitle>Gerar Relatório</QuickActionTitle>
                <QuickActionDescription>Criar novo relatório</QuickActionDescription>
              </QuickActionInfo>
            </QuickActionCard>
          </QuickActionsGrid>
        </SectionGrid>
      </Container>
    </Navbar>
  );
}
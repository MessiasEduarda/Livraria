'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/navbar';
import EditablePageTitle from '@/components/EditablePageTitle';
import { useAuth } from '@/hooks/useAuth';
import { listarMinhasVendas, resumoMinhasVendas, type VendaDTO, type ItemVendaDTO } from '@/services/api';
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
  FilterSection,
  FilterTitle,
  QuickFilters,
  QuickFilterButton,
  DateRow,
  DateInput,
  Select,
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
  EmptyTitle,
  EmptyText,
  Pagination,
  PageButton,
} from './styles';
import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

type PeriodFilter = 'month' | 'lastMonth' | 'year' | 'custom';

function getPeriodDates(period: PeriodFilter): { dataInicio: string; dataFim: string } | null {
  const now = new Date();
  const toISO = (d: Date) => d.toISOString().slice(0, 19);

  switch (period) {
    case 'month': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      return { dataInicio: toISO(start), dataFim: toISO(end) };
    }
    case 'lastMonth': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
      return { dataInicio: toISO(start), dataFim: toISO(end) };
    }
    case 'year': {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      return { dataInicio: toISO(start), dataFim: toISO(end) };
    }
    default:
      return null;
  }
}

const statusLabels: Record<string, string> = {
  completed: 'Concluída',
  pending: 'Pendente',
  cancelled: 'Cancelada',
};

export default function MinhasVendas() {
  const { user } = useAuth();
  const [sales, setSales] = useState<VendaDTO[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [resumo, setResumo] = useState<{ totalReceita: number; totalVendas: number; ticketMedio: number } | null>(null);
  const size = 12;

  const getFilterParams = useCallback(() => {
    const params: { dataInicio?: string; dataFim?: string; status?: string } = {};
    if (periodFilter === 'custom' && customStart) params.dataInicio = customStart + 'T00:00:00';
    if (periodFilter === 'custom' && customEnd) params.dataFim = customEnd + 'T23:59:59';
    const dates = getPeriodDates(periodFilter);
    if (dates) {
      params.dataInicio = dates.dataInicio;
      params.dataFim = dates.dataFim;
    }
    if (statusFilter) params.status = statusFilter;
    return params;
  }, [periodFilter, customStart, customEnd, statusFilter]);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    const filterParams = getFilterParams();
    try {
      const [resumoRes, vendasRes] = await Promise.all([
        resumoMinhasVendas(filterParams),
        listarMinhasVendas({ ...filterParams, page, size }),
      ]);
      setResumo(resumoRes);
      setSales(vendasRes.content);
      setTotalElements(vendasRes.totalElements);
      setTotalPages(vendasRes.totalPages);
    } catch {
      setResumo(null);
      setSales([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [page, getFilterParams, size]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const totalRevenue = resumo?.totalReceita ?? 0;
  const totalVendasPeriodo = resumo?.totalVendas ?? 0;
  const avgTicket = resumo?.ticketMedio ?? 0;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Navbar>
      <Container>
        <Header>
          <div>
            <EditablePageTitle pageKey="minhasVendas" defaultTitle="Minhas Vendas">
            {(title) => <Title>{title}</Title>}
          </EditablePageTitle>
            <Subtitle>
              Controle suas vendas por período. Apenas vendas realizadas por você aparecem aqui.
              {user?.nome && ` — Olá, ${user.nome}`}
            </Subtitle>
          </div>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon $color="#3CAD8C">
              <DollarSign size={24} strokeWidth={2} />
            </StatIcon>
            <StatContent>
              <StatLabel>Receita no período</StatLabel>
              <StatValue>{formatCurrency(totalRevenue)}</StatValue>
            </StatContent>
          </StatCard>
          <StatCard>
            <StatIcon $color="#2563eb">
              <ShoppingBag size={24} strokeWidth={2} />
            </StatIcon>
            <StatContent>
              <StatLabel>Vendas no período</StatLabel>
              <StatValue>{totalVendasPeriodo}</StatValue>
            </StatContent>
          </StatCard>
          <StatCard>
            <StatIcon $color="#059669">
              <TrendingUp size={24} strokeWidth={2} />
            </StatIcon>
            <StatContent>
              <StatLabel>Ticket médio</StatLabel>
              <StatValue>{formatCurrency(avgTicket)}</StatValue>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <FilterSection>
          <FilterTitle>Período e filtros</FilterTitle>
          <QuickFilters>
            <QuickFilterButton
              $active={periodFilter === 'month'}
              onClick={() => setPeriodFilter('month')}
            >
              Este mês
            </QuickFilterButton>
            <QuickFilterButton
              $active={periodFilter === 'lastMonth'}
              onClick={() => setPeriodFilter('lastMonth')}
            >
              Mês passado
            </QuickFilterButton>
            <QuickFilterButton
              $active={periodFilter === 'year'}
              onClick={() => setPeriodFilter('year')}
            >
              Este ano
            </QuickFilterButton>
            <QuickFilterButton
              $active={periodFilter === 'custom'}
              onClick={() => setPeriodFilter('custom')}
            >
              Período personalizado
            </QuickFilterButton>
          </QuickFilters>
          {periodFilter === 'custom' && (
            <DateRow>
              <span>De</span>
              <DateInput
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
              <span>até</span>
              <DateInput
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
            </DateRow>
          )}
          <DateRow style={{ marginTop: 12 }}>
            <span>Status:</span>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="completed">Concluída</option>
              <option value="pending">Pendente</option>
              <option value="cancelled">Cancelada</option>
            </Select>
          </DateRow>
        </FilterSection>

        {loading ? (
          <EmptyState>
            <EmptyTitle>Carregando...</EmptyTitle>
            <EmptyText>Aguarde enquanto buscamos suas vendas.</EmptyText>
          </EmptyState>
        ) : sales.length === 0 ? (
          <EmptyState>
            <EmptyTitle>Nenhuma venda no período</EmptyTitle>
            <EmptyText>
              Altere o período ou os filtros para ver suas vendas.
            </EmptyText>
          </EmptyState>
        ) : (
          <>
            <SalesGrid>
              {sales.map((sale) => (
                <SaleCard key={sale.id}>
                  <SaleHeader>
                    <SaleId>#{sale.id}</SaleId>
                    <SaleDate>{formatDate(sale.date)}</SaleDate>
                  </SaleHeader>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: 8 }}>
                    Cliente: <strong style={{ color: '#333' }}>{sale.customer}</strong>
                  </div>
                  <SaleItems>
                    {(sale.items ?? []).map((item: ItemVendaDTO, idx: number) => (
                      <SaleItem key={idx}>
                        <ItemInfo>
                          <ItemName>{item.bookTitle ?? item.titulo ?? '—'}</ItemName>
                          <ItemQuantity>× {item.quantidade}</ItemQuantity>
                        </ItemInfo>
                        <ItemPrice>
                          {formatCurrency((item.price ?? item.precoUnitario ?? 0) * item.quantidade)}
                        </ItemPrice>
                      </SaleItem>
                    ))}
                  </SaleItems>
                  <SaleFooter>
                    <TotalLabel>Total</TotalLabel>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <SaleStatus $status={sale.status}>
                        {statusLabels[sale.status] ?? sale.status}
                      </SaleStatus>
                      <TotalValue>{formatCurrency(sale.total ?? 0)}</TotalValue>
                    </div>
                  </SaleFooter>
                </SaleCard>
              ))}
            </SalesGrid>

            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Anterior
                </PageButton>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = page < 3 ? i : page - 2 + i;
                  if (p >= totalPages) return null;
                  return (
                    <PageButton
                      key={p}
                      $active={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p + 1}
                    </PageButton>
                  );
                })}
                <PageButton
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                >
                  Próxima
                </PageButton>
              </Pagination>
            )}
          </>
        )}
      </Container>
    </Navbar>
  );
}

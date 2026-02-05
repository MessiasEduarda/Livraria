'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import {
  PageContainer,
  DashboardBackground,
  DashboardContent,
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
  ActivitySection,
  ActivityHeader,
  ActivityTitle,
  ActivityList,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityTime,
  AlertsSection,
  AlertCard,
  AlertIconWrapper,
  AlertContent as DashAlertContent,
  AlertTitle as DashAlertTitle,
  AlertDescription as DashAlertDescription,
  AlertAction as DashAlertAction,
  SectionGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  SuccessCard,
  SuccessIcon,
  SuccessText,
  ClientesList,
  ClienteItem,
  ClienteAvatar,
  ClienteInfo,
  ClienteName,
  ClienteEmail,
  VIPBadge,
  ClienteStats,
  StatItem,
  StatItemLabel,
  StatItemValue,
  ModalFooter,
  ViewAllButton,
  CloseButton
} from './styles';

interface ClienteVIP {
  id: number;
  nome: string;
  email: string;
  avatar: string;
  totalCompras: number;
  valorGasto: number;
  dataPromocao: string;
}

interface ClienteVIPComponentProps {
  id?: string;
}

const clientesVIP: ClienteVIP[] = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@email.com",
    avatar: "https://ui-avatars.com/api/?name=Ana+Silva&background=0b4200&color=fff&size=200",
    totalCompras: 28,
    valorGasto: 12450.00,
    dataPromocao: "01/02/2024"
  },
  {
    id: 2,
    nome: "Carlos Santos",
    email: "carlos@email.com",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Santos&background=0b4200&color=fff&size=200",
    totalCompras: 35,
    valorGasto: 15890.50,
    dataPromocao: "03/02/2024"
  }
];

const recentActivities = [
  {
    type: 'sale',
    text: 'Nova venda realizada - Pedido #1010',
    time: 'Há 5 minutos',
  },
  {
    type: 'stock',
    text: 'Estoque baixo - Clean Code (8 unidades)',
    time: 'Há 23 minutos',
  },
  {
    type: 'customer',
    text: 'Novo cliente cadastrado - Beatriz Souza',
    time: 'Há 1 hora',
  },
];

export default function ClienteVIPComponent({ id }: ClienteVIPComponentProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push('/dashboard');
  };

  const handleViewAll = () => {
    router.push('/clientes');
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const totalRevenue = 34400.00;
  const totalOrders = 119;
  const averageTicket = totalRevenue / totalOrders;
  const totalCustomers = 10;

  return (
    <Navbar>
      <PageContainer>
        {/* Dashboard desfocado de fundo */}
        <DashboardBackground>
          <DashboardContent>
            <Header>
              <div>
                <Title>Dashboard</Title>
                <DateRange>Período: Últimos 7 dias</DateRange>
              </div>
            </Header>

            <StatsGrid>
              <StatCard>
                <StatIcon $color="#0b4200">
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
                  <StatValue>{totalOrders}</StatValue>
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
                  <StatLabel>Clientes Ativos</StatLabel>
                  <StatValue>{totalCustomers}</StatValue>
                  <StatTrend $positive={true}>+20% vs semana anterior</StatTrend>
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
                </ChartCard>

                <ChartCard>
                  <ChartHeader>
                    <ChartTitle>Vendas por Categoria</ChartTitle>
                    <ChartPeriod>Última semana</ChartPeriod>
                  </ChartHeader>
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
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
              <AlertCard>
                <AlertIconWrapper $color="#dc2626">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                </AlertIconWrapper>
                <DashAlertContent>
                  <DashAlertTitle>Estoque Crítico</DashAlertTitle>
                  <DashAlertDescription>3 produtos com estoque abaixo de 10 unidades</DashAlertDescription>
                </DashAlertContent>
                <DashAlertAction $color="#dc2626">Ver Produtos</DashAlertAction>
              </AlertCard>

              <AlertCard>
                <AlertIconWrapper $color="#2563eb">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </AlertIconWrapper>
                <DashAlertContent>
                  <DashAlertTitle>Meta Mensal</DashAlertTitle>
                  <DashAlertDescription>Você atingiu 78% da meta de vendas do mês</DashAlertDescription>
                </DashAlertContent>
                <DashAlertAction $color="#2563eb">Ver Progresso</DashAlertAction>
              </AlertCard>

              <AlertCard>
                <AlertIconWrapper $color="#059669">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </AlertIconWrapper>
                <DashAlertContent>
                  <DashAlertTitle>Novos Clientes VIP</DashAlertTitle>
                  <DashAlertDescription>2 clientes foram promovidos a VIP esta semana</DashAlertDescription>
                </DashAlertContent>
                <DashAlertAction $color="#059669">Ver Clientes</DashAlertAction>
              </AlertCard>
            </AlertsSection>
          </DashboardContent>
        </DashboardBackground>
        
        {/* Modal de Clientes VIP */}
        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Novos Clientes VIP</ModalTitle>
              <ModalClose onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              <SuccessCard>
                <SuccessIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </SuccessIcon>
                <SuccessText>
                  Parabéns! <strong>{clientesVIP.length} clientes</strong> foram promovidos ao status VIP esta semana
                </SuccessText>
              </SuccessCard>

              <ClientesList>
                {clientesVIP.map((cliente) => (
                  <ClienteItem key={cliente.id}>
                    <ClienteAvatar src={cliente.avatar} alt={cliente.nome} />
                    <ClienteInfo>
                      <div>
                        <ClienteName>{cliente.nome}</ClienteName>
                        <ClienteEmail>{cliente.email}</ClienteEmail>
                      </div>
                      <VIPBadge>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        VIP
                      </VIPBadge>
                    </ClienteInfo>
                    <ClienteStats>
                      <StatItem>
                        <StatItemLabel>Total de Compras</StatItemLabel>
                        <StatItemValue>{cliente.totalCompras}</StatItemValue>
                      </StatItem>
                      <StatItem>
                        <StatItemLabel>Valor Total</StatItemLabel>
                        <StatItemValue>R$ {cliente.valorGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</StatItemValue>
                      </StatItem>
                      <StatItem>
                        <StatItemLabel>Promovido em</StatItemLabel>
                        <StatItemValue>{cliente.dataPromocao}</StatItemValue>
                      </StatItem>
                    </ClienteStats>
                  </ClienteItem>
                ))}
              </ClientesList>
            </ModalBody>

            <ModalFooter>
              <CloseButton onClick={handleClose}>Fechar</CloseButton>
              <ViewAllButton onClick={handleViewAll}>Ver Todos os Clientes</ViewAllButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}
'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import ErrorModal from '@/components/modals/errorModal';
import CancelModal from '@/components/modals/cancelModal';
import { 
  Container,
  Header,
  Title,
  Subtitle,
  ContentWrapper,
  Sidebar,
  SidebarItem,
  SidebarIcon,
  SidebarLabel,
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SettingsGroup,
  SettingItem,
  SettingLabel,
  SettingDescription,
  SettingControl,
  Toggle,
  ToggleSlider,
  Input,
  Select,
  TextArea,
  Button,
  SaveButton,
  CancelButton,
  Divider,
  InfoCard,
  InfoIcon,
  InfoContent,
  InfoTitle,
  InfoDescription,
  ColorPicker,
  ColorPreview,
  ProfileSection,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  UploadButton,
  DangerZone,
  DangerTitle,
  DangerDescription,
  DangerButton,
  NotificationItem,
  NotificationIcon,
  NotificationContent,
  NotificationTitle,
  NotificationDescription,
  BackupCard,
  BackupHeader,
  BackupTitle,
  BackupDate,
  BackupSize,
  BackupActions,
  BackupButton
} from './styles';

type SettingCategory = 'geral' | 'loja' | 'notificacoes' | 'seguranca' | 'backup' | 'aparencia';

export default function Configuracoes() {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('geral');
  const [hasChanges, setHasChanges] = useState(false);

  // Estados para configurações gerais
  const [storeName, setStoreName] = useState('Entre Capítulos');
  const [storeEmail, setStoreEmail] = useState('contato@entrecapitulos.com.br');
  const [storePhone, setStorePhone] = useState('(11) 3456-7890');
  const [storeAddress, setStoreAddress] = useState('Rua dos Livros, 123 - São Paulo, SP');
  const [storeCNPJ, setStoreCNPJ] = useState('12.345.678/0001-90');

  // Estados para configurações de loja
  const [workingHours, setWorkingHours] = useState('Segunda a Sexta: 9h às 18h');
  const [deliveryTime, setDeliveryTime] = useState('3 a 5 dias úteis');
  const [minimumOrder, setMinimumOrder] = useState('50.00');
  const [freeShippingFrom, setFreeShippingFrom] = useState('150.00');
  const [defaultDiscount, setDefaultDiscount] = useState('5');

  // Estados para notificações
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [salesReports, setSalesReports] = useState(true);
  const [customerAlerts, setCustomerAlerts] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);

  // Estados para segurança
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Estados para aparência
  const [themeColor, setThemeColor] = useState('#0b4200');
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('pt-BR');

  // Estados para modais
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [showPhotoSuccessModal, setShowPhotoSuccessModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showBackupSuccessModal, setShowBackupSuccessModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showRestoreSuccessModal, setShowRestoreSuccessModal] = useState(false);
  const [showDeleteBackupModal, setShowDeleteBackupModal] = useState(false);
  const [showDeleteBackupSuccessModal, setShowDeleteBackupSuccessModal] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<number | null>(null);

  const handleSave = () => {
    setShowSaveConfirmModal(true);
  };

  const confirmSave = () => {
    setShowSaveConfirmModal(false);
    console.log('Salvando configurações...');
    setHasChanges(false);
    setShowSuccessModal(true);
  };

  const handleCancel = () => {
    setShowCancelConfirmModal(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirmModal(false);
    setHasChanges(false);
  };

  const handleChange = () => {
    setHasChanges(true);
  };

  const handlePasswordChange = () => {
    setShowPasswordChangeModal(true);
  };

  const confirmPasswordChange = () => {
    setShowPasswordChangeModal(false);
    console.log('Alterando senha...');
    setShowPasswordSuccessModal(true);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true);
  };

  const confirmDeleteAccount = () => {
    setShowDeleteAccountModal(false);
    console.log('Excluindo conta...');
  };

  const handlePhotoUpload = () => {
    setShowPhotoUploadModal(true);
  };

  const confirmPhotoUpload = () => {
    setShowPhotoUploadModal(false);
    console.log('Fazendo upload de foto...');
    setShowPhotoSuccessModal(true);
  };

  const handleCreateBackup = () => {
    setShowBackupModal(true);
  };

  const confirmCreateBackup = () => {
    setShowBackupModal(false);
    console.log('Criando backup...');
    setShowBackupSuccessModal(true);
  };

  const handleRestoreBackup = (backupId: number) => {
    setSelectedBackupId(backupId);
    setShowRestoreModal(true);
  };

  const confirmRestoreBackup = () => {
    setShowRestoreModal(false);
    console.log('Restaurando backup:', selectedBackupId);
    setShowRestoreSuccessModal(true);
  };

  const handleDeleteBackup = (backupId: number) => {
    setSelectedBackupId(backupId);
    setShowDeleteBackupModal(true);
  };

  const confirmDeleteBackup = () => {
    setShowDeleteBackupModal(false);
    console.log('Excluindo backup:', selectedBackupId);
    setShowDeleteBackupSuccessModal(true);
  };

  const handleDownloadBackup = (backupId: number) => {
    console.log('Baixando backup:', backupId);
  };

  const menuItems = [
    {
      id: 'geral' as SettingCategory,
      label: 'Geral',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M1 12h6m6 0h6m-13.2 5.2l4.2-4.2m6 0l4.2 4.2"/>
        </svg>
      )
    },
    {
      id: 'loja' as SettingCategory,
      label: 'Loja',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      id: 'notificacoes' as SettingCategory,
      label: 'Notificações',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      )
    },
    {
      id: 'seguranca' as SettingCategory,
      label: 'Segurança',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      id: 'backup' as SettingCategory,
      label: 'Backup',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
      )
    },
    {
      id: 'aparencia' as SettingCategory,
      label: 'Aparência',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      )
    }
  ];

  const backups = [
    {
      id: 1,
      title: 'Backup Automático',
      date: '04 de Fevereiro de 2026, 03:00',
      size: '245 MB'
    },
    {
      id: 2,
      title: 'Backup Manual',
      date: '01 de Fevereiro de 2026, 14:30',
      size: '238 MB'
    },
    {
      id: 3,
      title: 'Backup Automático',
      date: '28 de Janeiro de 2026, 03:00',
      size: '232 MB'
    }
  ];

  return (
    <Navbar>
      <Container>
        <Header>
          <div>
            <Title>Configurações</Title>
            <Subtitle>Gerencie as configurações do sistema e personalize sua experiência</Subtitle>
          </div>
        </Header>

        <ContentWrapper>
          <Sidebar>
            {menuItems.map(item => (
              <SidebarItem
                key={item.id}
                $active={activeCategory === item.id}
                onClick={() => setActiveCategory(item.id)}
              >
                <SidebarIcon $active={activeCategory === item.id}>
                  {item.icon}
                </SidebarIcon>
                <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarItem>
            ))}
          </Sidebar>

          <MainContent>
            {/* GERAL */}
            {activeCategory === 'geral' && (
              <>
                <Section>
                  <SectionHeader>
                    <SectionTitle>Informações da Loja</SectionTitle>
                    <SectionDescription>
                      Configure as informações básicas da sua livraria
                    </SectionDescription>
                  </SectionHeader>

                  <SettingsGroup>
                    <SettingItem>
                      <SettingLabel>Nome da Loja</SettingLabel>
                      <SettingControl>
                        <Input
                          type="text"
                          value={storeName}
                          onChange={(e) => { setStoreName(e.target.value); handleChange(); }}
                          placeholder="Digite o nome da loja"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Email de Contato</SettingLabel>
                      <SettingControl>
                        <Input
                          type="email"
                          value={storeEmail}
                          onChange={(e) => { setStoreEmail(e.target.value); handleChange(); }}
                          placeholder="contato@exemplo.com"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Telefone</SettingLabel>
                      <SettingControl>
                        <Input
                          type="tel"
                          value={storePhone}
                          onChange={(e) => { setStorePhone(e.target.value); handleChange(); }}
                          placeholder="(00) 0000-0000"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>CNPJ</SettingLabel>
                      <SettingControl>
                        <Input
                          type="text"
                          value={storeCNPJ}
                          onChange={(e) => { setStoreCNPJ(e.target.value); handleChange(); }}
                          placeholder="00.000.000/0000-00"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Endereço Completo</SettingLabel>
                      <SettingControl>
                        <TextArea
                          value={storeAddress}
                          onChange={(e) => { setStoreAddress(e.target.value); handleChange(); }}
                          placeholder="Rua, número, complemento, bairro, cidade, estado"
                          rows={3}
                        />
                      </SettingControl>
                    </SettingItem>
                  </SettingsGroup>
                </Section>

                <Divider />

                <Section>
                  <SectionHeader>
                    <SectionTitle>Perfil do Administrador</SectionTitle>
                    <SectionDescription>
                      Gerencie suas informações pessoais
                    </SectionDescription>
                  </SectionHeader>

                  <ProfileSection>
                    <ProfileAvatar>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </ProfileAvatar>
                    <ProfileInfo>
                      <ProfileName>Administrador Principal</ProfileName>
                      <ProfileEmail>admin@entrecapitulos.com.br</ProfileEmail>
                    </ProfileInfo>
                    <UploadButton onClick={handlePhotoUpload}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Alterar Foto
                    </UploadButton>
                  </ProfileSection>
                </Section>
              </>
            )}

            {/* LOJA */}
            {activeCategory === 'loja' && (
              <>
                <Section>
                  <SectionHeader>
                    <SectionTitle>Configurações de Funcionamento</SectionTitle>
                    <SectionDescription>
                      Defina horários, prazos e políticas da loja
                    </SectionDescription>
                  </SectionHeader>

                  <SettingsGroup>
                    <SettingItem>
                      <SettingLabel>Horário de Funcionamento</SettingLabel>
                      <SettingControl>
                        <Input
                          type="text"
                          value={workingHours}
                          onChange={(e) => { setWorkingHours(e.target.value); handleChange(); }}
                          placeholder="Ex: Segunda a Sexta: 9h às 18h"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Prazo de Entrega Padrão</SettingLabel>
                      <SettingControl>
                        <Input
                          type="text"
                          value={deliveryTime}
                          onChange={(e) => { setDeliveryTime(e.target.value); handleChange(); }}
                          placeholder="Ex: 3 a 5 dias úteis"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Valor Mínimo do Pedido (R$)</SettingLabel>
                      <SettingControl>
                        <Input
                          type="number"
                          step="0.01"
                          value={minimumOrder}
                          onChange={(e) => { setMinimumOrder(e.target.value); handleChange(); }}
                          placeholder="0.00"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Frete Grátis a partir de (R$)</SettingLabel>
                      <SettingControl>
                        <Input
                          type="number"
                          step="0.01"
                          value={freeShippingFrom}
                          onChange={(e) => { setFreeShippingFrom(e.target.value); handleChange(); }}
                          placeholder="0.00"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Desconto Padrão para VIP (%)</SettingLabel>
                      <SettingControl>
                        <Input
                          type="number"
                          value={defaultDiscount}
                          onChange={(e) => { setDefaultDiscount(e.target.value); handleChange(); }}
                          placeholder="0"
                        />
                      </SettingControl>
                    </SettingItem>
                  </SettingsGroup>
                </Section>

                <Divider />

                <InfoCard>
                  <InfoIcon>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  </InfoIcon>
                  <InfoContent>
                    <InfoTitle>Dica de Configuração</InfoTitle>
                    <InfoDescription>
                      Configure o frete grátis para incentivar compras maiores. 
                      O valor ideal é 3x o seu ticket médio atual.
                    </InfoDescription>
                  </InfoContent>
                </InfoCard>
              </>
            )}

            {/* NOTIFICAÇÕES */}
            {activeCategory === 'notificacoes' && (
              <>
                <Section>
                  <SectionHeader>
                    <SectionTitle>Preferências de Notificações</SectionTitle>
                    <SectionDescription>
                      Escolha como deseja receber alertas e atualizações
                    </SectionDescription>
                  </SectionHeader>

                  <SettingsGroup>
                    <NotificationItem>
                      <NotificationIcon $color="#0b4200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>Notificações por Email</NotificationTitle>
                        <NotificationDescription>
                          Receba alertas importantes por email
                        </NotificationDescription>
                      </NotificationContent>
                      <Toggle
                        checked={emailNotifications}
                        onClick={() => { setEmailNotifications(!emailNotifications); handleChange(); }}
                      >
                        <ToggleSlider $checked={emailNotifications} />
                      </Toggle>
                    </NotificationItem>

                    <NotificationItem>
                      <NotificationIcon $color="#2563eb">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                          <line x1="12" y1="18" x2="12.01" y2="18"/>
                        </svg>
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>Notificações por SMS</NotificationTitle>
                        <NotificationDescription>
                          Receba alertas críticos por SMS
                        </NotificationDescription>
                      </NotificationContent>
                      <Toggle
                        checked={smsNotifications}
                        onClick={() => { setSmsNotifications(!smsNotifications); handleChange(); }}
                      >
                        <ToggleSlider $checked={smsNotifications} />
                      </Toggle>
                    </NotificationItem>

                    <NotificationItem>
                      <NotificationIcon $color="#7c3aed">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        </svg>
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>Alertas de Estoque Baixo</NotificationTitle>
                        <NotificationDescription>
                          Seja notificado quando o estoque estiver baixo
                        </NotificationDescription>
                      </NotificationContent>
                      <Toggle
                        checked={stockAlerts}
                        onClick={() => { setStockAlerts(!stockAlerts); handleChange(); }}
                      >
                        <ToggleSlider $checked={stockAlerts} />
                      </Toggle>
                    </NotificationItem>

                    <NotificationItem>
                      <NotificationIcon $color="#059669">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="20" x2="12" y2="10"/>
                          <line x1="18" y1="20" x2="18" y2="4"/>
                          <line x1="6" y1="20" x2="6" y2="16"/>
                        </svg>
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>Relatórios de Vendas</NotificationTitle>
                        <NotificationDescription>
                          Receba relatórios periódicos de vendas
                        </NotificationDescription>
                      </NotificationContent>
                      <Toggle
                        checked={salesReports}
                        onClick={() => { setSalesReports(!salesReports); handleChange(); }}
                      >
                        <ToggleSlider $checked={salesReports} />
                      </Toggle>
                    </NotificationItem>

                    <NotificationItem>
                      <NotificationIcon $color="#dc2626">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>Novos Clientes</NotificationTitle>
                        <NotificationDescription>
                          Seja notificado sobre novos cadastros
                        </NotificationDescription>
                      </NotificationContent>
                      <Toggle
                        checked={customerAlerts}
                        onClick={() => { setCustomerAlerts(!customerAlerts); handleChange(); }}
                      >
                        <ToggleSlider $checked={customerAlerts} />
                      </Toggle>
                    </NotificationItem>

                    <NotificationItem>
                      <NotificationIcon $color="#ea580c">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                        </svg>
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>Atualizações do Sistema</NotificationTitle>
                        <NotificationDescription>
                          Receba informações sobre atualizações
                        </NotificationDescription>
                      </NotificationContent>
                      <Toggle
                        checked={systemUpdates}
                        onClick={() => { setSystemUpdates(!systemUpdates); handleChange(); }}
                      >
                        <ToggleSlider $checked={systemUpdates} />
                      </Toggle>
                    </NotificationItem>
                  </SettingsGroup>
                </Section>
              </>
            )}

            {/* SEGURANÇA */}
            {activeCategory === 'seguranca' && (
              <>
                <Section>
                  <SectionHeader>
                    <SectionTitle>Segurança da Conta</SectionTitle>
                    <SectionDescription>
                      Proteja sua conta com configurações de segurança avançadas
                    </SectionDescription>
                  </SectionHeader>

                  <SettingsGroup>
                    <SettingItem>
                      <div>
                        <SettingLabel>Autenticação de Dois Fatores</SettingLabel>
                        <SettingDescription>
                          Adicione uma camada extra de segurança com código SMS
                        </SettingDescription>
                      </div>
                      <Toggle
                        checked={twoFactorAuth}
                        onClick={() => { setTwoFactorAuth(!twoFactorAuth); handleChange(); }}
                      >
                        <ToggleSlider $checked={twoFactorAuth} />
                      </Toggle>
                    </SettingItem>

                    <SettingItem>
                      <div>
                        <SettingLabel>Logout Automático</SettingLabel>
                        <SettingDescription>
                          Desconecta automaticamente após período de inatividade
                        </SettingDescription>
                      </div>
                      <Toggle
                        checked={autoLogout}
                        onClick={() => { setAutoLogout(!autoLogout); handleChange(); }}
                      >
                        <ToggleSlider $checked={autoLogout} />
                      </Toggle>
                    </SettingItem>

                    <SettingItem>
                      <div>
                        <SettingLabel>Alertas de Login</SettingLabel>
                        <SettingDescription>
                          Receba notificação quando houver login em novo dispositivo
                        </SettingDescription>
                      </div>
                      <Toggle
                        checked={loginAlerts}
                        onClick={() => { setLoginAlerts(!loginAlerts); handleChange(); }}
                      >
                        <ToggleSlider $checked={loginAlerts} />
                      </Toggle>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Tempo de Sessão (minutos)</SettingLabel>
                      <SettingControl style={{ maxWidth: '200px' }}>
                        <Select
                          value={sessionTimeout}
                          onChange={(e) => { setSessionTimeout(e.target.value); handleChange(); }}
                        >
                          <option value="15">15 minutos</option>
                          <option value="30">30 minutos</option>
                          <option value="60">1 hora</option>
                          <option value="120">2 horas</option>
                        </Select>
                      </SettingControl>
                    </SettingItem>
                  </SettingsGroup>
                </Section>

                <Divider />

                <Section>
                  <SectionHeader>
                    <SectionTitle>Alterar Senha</SectionTitle>
                    <SectionDescription>
                      Atualize sua senha periodicamente para maior segurança
                    </SectionDescription>
                  </SectionHeader>

                  <SettingsGroup>
                    <SettingItem>
                      <SettingLabel>Senha Atual</SettingLabel>
                      <SettingControl>
                        <Input
                          type="password"
                          placeholder="Digite sua senha atual"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Nova Senha</SettingLabel>
                      <SettingControl>
                        <Input
                          type="password"
                          placeholder="Digite a nova senha"
                        />
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Confirmar Nova Senha</SettingLabel>
                      <SettingControl>
                        <Input
                          type="password"
                          placeholder="Confirme a nova senha"
                        />
                      </SettingControl>
                    </SettingItem>
                  </SettingsGroup>

                  <Button style={{ marginTop: '16px' }} onClick={handlePasswordChange}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Atualizar Senha
                  </Button>
                </Section>

                <Divider />

                <DangerZone>
                  <DangerTitle>Zona de Perigo</DangerTitle>
                  <DangerDescription>
                    Ações irreversíveis que afetam permanentemente sua conta
                  </DangerDescription>
                  <DangerButton onClick={handleDeleteAccount}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Excluir Conta Permanentemente
                  </DangerButton>
                </DangerZone>
              </>
            )}

            {/* BACKUP */}
            {activeCategory === 'backup' && (
              <>
                <Section>
                  <SectionHeader>
                    <SectionTitle>Gerenciamento de Backups</SectionTitle>
                    <SectionDescription>
                      Proteja seus dados com backups automáticos e manuais
                    </SectionDescription>
                  </SectionHeader>

                  <InfoCard style={{ marginBottom: '24px' }}>
                    <InfoIcon>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                      </svg>
                    </InfoIcon>
                    <InfoContent>
                      <InfoTitle>Backup Automático Ativo</InfoTitle>
                      <InfoDescription>
                        Seus dados são automaticamente salvos todos os dias às 03:00. 
                        O último backup foi realizado em 04/02/2026 às 03:00.
                      </InfoDescription>
                    </InfoContent>
                  </InfoCard>

                  <Button onClick={handleCreateBackup}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Criar Backup Manual Agora
                  </Button>
                </Section>

                <Divider />

                <Section>
                  <SectionHeader>
                    <SectionTitle>Histórico de Backups</SectionTitle>
                    <SectionDescription>
                      Visualize e gerencie seus backups anteriores
                    </SectionDescription>
                  </SectionHeader>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {backups.map(backup => (
                      <BackupCard key={backup.id}>
                        <div>
                          <BackupHeader>
                            <BackupTitle>{backup.title}</BackupTitle>
                            <BackupSize>{backup.size}</BackupSize>
                          </BackupHeader>
                          <BackupDate>{backup.date}</BackupDate>
                        </div>
                        <BackupActions>
                          <BackupButton $type="download" onClick={() => handleDownloadBackup(backup.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Baixar
                          </BackupButton>
                          <BackupButton $type="restore" onClick={() => handleRestoreBackup(backup.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                            </svg>
                            Restaurar
                          </BackupButton>
                          <BackupButton $type="delete" onClick={() => handleDeleteBackup(backup.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Excluir
                          </BackupButton>
                        </BackupActions>
                      </BackupCard>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {/* APARÊNCIA */}
            {activeCategory === 'aparencia' && (
              <>
                <Section>
                  <SectionHeader>
                    <SectionTitle>Personalização</SectionTitle>
                    <SectionDescription>
                      Customize a aparência do sistema de acordo com suas preferências
                    </SectionDescription>
                  </SectionHeader>

                  <SettingsGroup>
                    <SettingItem>
                      <div>
                        <SettingLabel>Cor Principal do Tema</SettingLabel>
                        <SettingDescription>
                          Escolha a cor principal do sistema
                        </SettingDescription>
                      </div>
                      <ColorPicker>
                        <Input
                          type="color"
                          value={themeColor}
                          onChange={(e) => { setThemeColor(e.target.value); handleChange(); }}
                          style={{ width: '60px', height: '40px', padding: '4px' }}
                        />
                        <ColorPreview $color={themeColor} />
                      </ColorPicker>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Tamanho da Fonte</SettingLabel>
                      <SettingControl style={{ maxWidth: '250px' }}>
                        <Select
                          value={fontSize}
                          onChange={(e) => { setFontSize(e.target.value); handleChange(); }}
                        >
                          <option value="small">Pequena</option>
                          <option value="medium">Média</option>
                          <option value="large">Grande</option>
                        </Select>
                      </SettingControl>
                    </SettingItem>

                    <SettingItem>
                      <SettingLabel>Idioma do Sistema</SettingLabel>
                      <SettingControl style={{ maxWidth: '250px' }}>
                        <Select
                          value={language}
                          onChange={(e) => { setLanguage(e.target.value); handleChange(); }}
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es-ES">Español</option>
                        </Select>
                      </SettingControl>
                    </SettingItem>
                  </SettingsGroup>
                </Section>

                <Divider />

                <InfoCard>
                  <InfoIcon>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                  </InfoIcon>
                  <InfoContent>
                    <InfoTitle>Tema Personalizado</InfoTitle>
                    <InfoDescription>
                      As alterações de aparência serão aplicadas em toda a interface do sistema. 
                      Algumas mudanças podem exigir atualização da página.
                    </InfoDescription>
                  </InfoContent>
                </InfoCard>
              </>
            )}

            {/* BOTÕES DE AÇÃO */}
            {hasChanges && (
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginTop: '32px', 
                paddingTop: '24px', 
                borderTop: '1px solid #e0e0e0',
                justifyContent: 'flex-end'
              }}>
                <CancelButton onClick={handleCancel}>
                  Cancelar
                </CancelButton>
                <SaveButton onClick={handleSave}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Salvar Alterações
                </SaveButton>
              </div>
            )}
          </MainContent>
        </ContentWrapper>
      </Container>

      {/* MODAIS - OBSERVE QUE NÃO TEM PROP title EM ALGUNS MODAIS */}
      {/* MODAIS */}
      <ConfirmModal
        isOpen={showSaveConfirmModal}
        title="Confirmar ação"
        message="Deseja realmente prosseguir com esta ação? Esta operação não poderá ser desfeita."
        onConfirm={confirmSave}
        onCancel={() => setShowSaveConfirmModal(false)}
        confirmText="Salvar"
        cancelText="Cancelar"
      />

      <CancelModal
        isOpen={showCancelConfirmModal}
        title="Cancelar Alterações"
        message="Tem certeza que deseja cancelar? Todas as alterações não salvas serão perdidas."
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelConfirmModal(false)}
      />

      <SucessModal
        isOpen={showSuccessModal}
        title="Sucesso!"
        message="Configurações salvas com sucesso!"
        onClose={() => setShowSuccessModal(false)}
        buttonText="Continuar"
      />

      <ConfirmModal
        isOpen={showPasswordChangeModal}
        title="Alterar Senha"
        message="Tem certeza que deseja alterar sua senha? Você precisará fazer login novamente."
        onConfirm={confirmPasswordChange}
        onCancel={() => setShowPasswordChangeModal(false)}
        confirmText="Alterar"
        cancelText="Cancelar"
      />

      <SucessModal
        isOpen={showPasswordSuccessModal}
        title="Senha Alterada"
        message="Sua senha foi alterada com sucesso! Por favor, faça login novamente."
        onClose={() => setShowPasswordSuccessModal(false)}
        buttonText="Fazer Login"
      />

      <ConfirmModal
        isOpen={showDeleteAccountModal}
        title="Excluir Conta"
        message="Esta ação é irreversível! Todos os seus dados serão permanentemente excluídos. Tem certeza que deseja continuar?"
        onConfirm={confirmDeleteAccount}
        onCancel={() => setShowDeleteAccountModal(false)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />

      <ConfirmModal
        isOpen={showPhotoUploadModal}
        title="Alterar Foto"
        message="Deseja alterar sua foto de perfil?"
        onConfirm={confirmPhotoUpload}
        onCancel={() => setShowPhotoUploadModal(false)}
        confirmText="Alterar"
        cancelText="Cancelar"
      />

      <SucessModal
        isOpen={showPhotoSuccessModal}
        title="Foto Alterada"
        message="Foto de perfil alterada com sucesso!"
        onClose={() => setShowPhotoSuccessModal(false)}
        buttonText="Continuar"
      />

      <ConfirmModal
        isOpen={showBackupModal}
        title="Criar Backup"
        message="Deseja criar um backup manual agora? Este processo pode levar alguns minutos."
        onConfirm={confirmCreateBackup}
        onCancel={() => setShowBackupModal(false)}
        confirmText="Criar"
        cancelText="Cancelar"
      />

      <SucessModal
        isOpen={showBackupSuccessModal}
        title="Backup Criado"
        message="Backup criado com sucesso! Seus dados estão seguros."
        onClose={() => setShowBackupSuccessModal(false)}
        buttonText="Continuar"
      />

      <ConfirmModal
        isOpen={showRestoreModal}
        title="Restaurar Backup"
        message="Tem certeza que deseja restaurar este backup? Os dados atuais serão substituídos."
        onConfirm={confirmRestoreBackup}
        onCancel={() => setShowRestoreModal(false)}
        confirmText="Restaurar"
        cancelText="Cancelar"
      />

      <SucessModal
        isOpen={showRestoreSuccessModal}
        title="Backup Restaurado"
        message="Backup restaurado com sucesso! Os dados foram recuperados."
        onClose={() => setShowRestoreSuccessModal(false)}
        buttonText="Continuar"
      />

      <ConfirmModal
        isOpen={showDeleteBackupModal}
        title="Excluir Backup"
        message="Tem certeza que deseja excluir este backup? Esta ação não pode ser desfeita."
        onConfirm={confirmDeleteBackup}
        onCancel={() => setShowDeleteBackupModal(false)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />

      <SucessModal
        isOpen={showDeleteBackupSuccessModal}
        title="Backup Excluído"
        message="Backup excluído com sucesso!"
        onClose={() => setShowDeleteBackupSuccessModal(false)}
        buttonText="Continuar"
      />
    </Navbar>
  );
}
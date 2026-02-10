'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Building2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import { buscarEmpresa, type EmpresaDTO } from '@/services/api';
import {
  PageContainer,
  EmpresasBackground,
  EmpresasContent,
  Header,
  Title,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ContentLayout,
  LeftColumn,
  RightColumn,
  EmpresaPlaceholder,
  InfoBox,
  InfoLabel,
  InfoValue,
  EmpresaNameText,
  EmpresaEmailText,
  DescriptionSection,
  DescriptionTitle,
  DescriptionText,
  DetailsRow,
  DetailItem,
  DetailLabel,
  DetailValue,
  StatusBox,
  StatusLabel,
  StatusValue,
  ModalFooter,
  BackButton,
  EditButton,
  NotFound,
} from './styles';

function formatCnpjDisplay(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

export default function DetalhesEmpresaComponent() {
  const params = useParams();
  const router = useRouter();
  const empresaId = parseInt(params.id as string, 10);
  const [empresa, setEmpresa] = useState<EmpresaDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!empresaId || isNaN(empresaId)) {
      setLoading(false);
      return;
    }
    buscarEmpresa(empresaId)
      .then(setEmpresa)
      .catch(() => setEmpresa(null))
      .finally(() => setLoading(false));
  }, [empresaId]);

  const handleClose = () => {
    router.push('/dashboard-admin');
  };

  const handleEdit = () => {
    router.push(`/dashboard-admin?editar=${empresaId}`);
  };

  if (loading) {
    return (
      <Navbar>
        <PageContainer>
          <EmpresasBackground>
            <EmpresasContent>
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando empresa...</p>
            </EmpresasContent>
          </EmpresasBackground>
        </PageContainer>
      </Navbar>
    );
  }

  if (!empresa) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Empresa não encontrada</h1>
            <BackButton onClick={handleClose}>
              Voltar ao Painel
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  const dataCadastroFormatada = empresa.createdAt
    ? new Date(empresa.createdAt).toLocaleDateString('pt-BR')
    : '—';
  const cnpjFormatado = empresa.cnpj ? formatCnpjDisplay(empresa.cnpj.replace(/\D/g, '')) : '—';
  const formasPagamento = (empresa.formasPagamento || []).length
    ? empresa.formasPagamento!.join(', ')
    : '—';
  const acessos = (empresa.permissoes || []).length
    ? empresa.permissoes!.join(', ')
    : '—';

  return (
    <Navbar>
      <PageContainer>
        <EmpresasBackground>
          <EmpresasContent>
            <Header>
              <Title>Detalhes da Empresa</Title>
            </Header>
          </EmpresasContent>
        </EmpresasBackground>

        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Detalhes da Empresa</ModalTitle>
              <ModalClose onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              <ContentLayout>
                <LeftColumn>
                  <EmpresaPlaceholder>
                    <Building2 size={120} strokeWidth={1.5} />
                  </EmpresaPlaceholder>
                  <InfoBox>
                    <InfoLabel>Data de cadastro</InfoLabel>
                    <InfoValue>{dataCadastroFormatada}</InfoValue>
                  </InfoBox>
                </LeftColumn>

                <RightColumn>
                  <EmpresaNameText>{empresa.nome}</EmpresaNameText>
                  <EmpresaEmailText>{empresa.email}</EmpresaEmailText>

                  <DetailsRow>
                    <DetailItem>
                      <DetailLabel>CNPJ</DetailLabel>
                      <DetailValue>{cnpjFormatado}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Usuários</DetailLabel>
                      <DetailValue>{empresa.totalUsuarios ?? 0}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Clientes</DetailLabel>
                      <DetailValue>{empresa.totalClientes ?? 0}</DetailValue>
                    </DetailItem>
                  </DetailsRow>

                  <DescriptionSection>
                    <DescriptionTitle>Formas de pagamento</DescriptionTitle>
                    <DescriptionText>{formasPagamento}</DescriptionText>
                  </DescriptionSection>

                  <DescriptionSection>
                    <DescriptionTitle>Acessos permitidos</DescriptionTitle>
                    <DescriptionText>{acessos}</DescriptionText>
                  </DescriptionSection>

                  {empresa.observacoes && (
                    <DescriptionSection>
                      <DescriptionTitle>Observações</DescriptionTitle>
                      <DescriptionText>{empresa.observacoes}</DescriptionText>
                    </DescriptionSection>
                  )}

                  <StatusBox $ativo={empresa.ativo}>
                    <StatusLabel>Status</StatusLabel>
                    <StatusValue>
                      {empresa.ativo ? 'Empresa Ativa' : 'Empresa Inativa'}
                    </StatusValue>
                  </StatusBox>
                </RightColumn>
              </ContentLayout>
            </ModalBody>

            <ModalFooter>
              <BackButton onClick={handleClose}>
                Voltar
              </BackButton>
              <EditButton onClick={handleEdit}>
                Editar Empresa
              </EditButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}

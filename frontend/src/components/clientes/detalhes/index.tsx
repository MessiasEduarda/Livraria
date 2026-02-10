'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { buscarCliente, type ClienteDTO } from '@/services/api';
import {
  PageContainer,
  ClientesBackground,
  ClientesContent,
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
  ClienteAvatarLarge,
  InfoBox,
  InfoLabel,
  InfoValue,
  ClienteNameText,
  ClienteEmailText,
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
  NotFound
} from './styles';

function avatarUrl(nome: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=0b4200&color=fff&size=200`;
}

export default function DetalhesClienteComponent() {
  const params = useParams();
  const router = useRouter();
  const clienteId = parseInt(params.id as string, 10);
  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clienteId || isNaN(clienteId)) {
      setLoading(false);
      return;
    }
    buscarCliente(clienteId)
      .then(setCliente)
      .catch(() => setCliente(null))
      .finally(() => setLoading(false));
  }, [clienteId]);

  const handleClose = () => {
    router.push('/clientes');
  };

  const handleEdit = () => {
    router.push(`/clientes/editar/${clienteId}`);
  };

  if (loading) {
    return (
      <Navbar>
        <PageContainer>
          <ClientesBackground>
            <ClientesContent>
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando cliente...</p>
            </ClientesContent>
          </ClientesBackground>
        </PageContainer>
      </Navbar>
    );
  }

  if (!cliente) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Cliente não encontrado</h1>
            <BackButton onClick={handleClose}>
              Voltar para Clientes
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  const statusDisplay = (cliente.status?.toUpperCase() === 'ACTIVE') ? 'ativo' : 'inativo';
  const dataCadastroFormatada = cliente.dataCadastro
    ? new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')
    : '—';

  return (
    <Navbar>
      <PageContainer>
        <ClientesBackground>
          <ClientesContent>
            <Header>
              <Title>Detalhes do Cliente</Title>
            </Header>
          </ClientesContent>
        </ClientesBackground>

        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Detalhes do Cliente</ModalTitle>
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
                  <ClienteAvatarLarge src={avatarUrl(cliente.nome)} alt={cliente.nome} />
                  <InfoBox>
                    <InfoLabel>Data de Cadastro</InfoLabel>
                    <InfoValue>{dataCadastroFormatada}</InfoValue>
                  </InfoBox>
                </LeftColumn>

                <RightColumn>
                  <ClienteNameText>{cliente.nome}</ClienteNameText>
                  <ClienteEmailText>{cliente.email}</ClienteEmailText>

                  <DescriptionSection>
                    <DescriptionTitle>Informações de Contato</DescriptionTitle>
                    <DescriptionText>
                      Telefone: {cliente.telefone}<br/>
                      Email: {cliente.email}
                    </DescriptionText>
                  </DescriptionSection>

                  <DetailsRow>
                    <DetailItem>
                      <DetailLabel>CPF</DetailLabel>
                      <DetailValue>{cliente.cpf}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>CEP</DetailLabel>
                      <DetailValue>{cliente.cep ?? '—'}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>ID</DetailLabel>
                      <DetailValue>#{cliente.id}</DetailValue>
                    </DetailItem>
                  </DetailsRow>

                  <DescriptionSection>
                    <DescriptionTitle>Endereço Completo</DescriptionTitle>
                    <DescriptionText>
                      {cliente.endereco || '—'}<br/>
                      {cliente.cidade ?? '—'} - {cliente.estado ?? '—'}<br/>
                      CEP: {cliente.cep ?? '—'}
                    </DescriptionText>
                  </DescriptionSection>

                  <StatusBox $status={statusDisplay}>
                    <StatusLabel>Status</StatusLabel>
                    <StatusValue>
                      {statusDisplay === 'ativo' ? 'Cliente Ativo' : 'Cliente Inativo'}
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
                Editar Cliente
              </EditButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}
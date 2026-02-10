'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { buscarLivro, type LivroDTO } from '@/services/api';
import {
  PageContainer,
  HomeBackground,
  HomeContent,
  HomeHeader,
  HomeTitle,
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
  BookCoverImage,
  PriceBox,
  PriceLabel,
  PriceValue,
  CategoryBadge,
  BookTitleText,
  BookAuthorText,
  DescriptionSection,
  DescriptionTitle,
  DescriptionText,
  DetailsRow,
  DetailItem,
  DetailLabel,
  DetailValue,
  StockBox,
  StockLabel,
  StockValue,
  ModalFooter,
  BackButton,
  EditButton,
  NotFound
} from './styles';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop';

export default function DetalhesComponent() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string, 10);
  const [livro, setLivro] = useState<LivroDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId || isNaN(bookId)) {
      setLoading(false);
      return;
    }
    buscarLivro(bookId)
      .then(setLivro)
      .catch(() => setLivro(null))
      .finally(() => setLoading(false));
  }, [bookId]);

  const handleClose = () => {
    router.push('/home');
  };

  const handleEdit = () => {
    router.push(`/home/editar/${bookId}`);
  };

  if (loading) {
    return (
      <Navbar>
        <PageContainer>
          <HomeBackground>
            <HomeContent>
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando livro...</p>
            </HomeContent>
          </HomeBackground>
        </PageContainer>
      </Navbar>
    );
  }

  if (!livro) {
    return (
      <Navbar>
        <PageContainer>
          <NotFound>
            <h1>Livro não encontrado</h1>
            <BackButton onClick={handleClose}>
              Voltar para Home
            </BackButton>
          </NotFound>
        </PageContainer>
      </Navbar>
    );
  }

  const coverUrl = livro.imagemCapa || DEFAULT_COVER;

  return (
    <Navbar>
      <PageContainer>
        <HomeBackground>
          <HomeContent>
            <HomeHeader>
              <HomeTitle>Detalhes do Livro</HomeTitle>
            </HomeHeader>
          </HomeContent>
        </HomeBackground>

        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Detalhes do Livro</ModalTitle>
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
                  <BookCoverImage src={coverUrl} alt={livro.titulo} />
                  <PriceBox>
                    <PriceLabel>Preço</PriceLabel>
                    <PriceValue>R$ {livro.preco.toFixed(2)}</PriceValue>
                  </PriceBox>
                </LeftColumn>

                <RightColumn>
                  <CategoryBadge>{livro.categoria}</CategoryBadge>
                  <BookTitleText>{livro.titulo}</BookTitleText>
                  <BookAuthorText>por {livro.autor}</BookAuthorText>

                  <DescriptionSection>
                    <DescriptionTitle>Descrição</DescriptionTitle>
                    <DescriptionText>
                      {livro.descricao || `Livro da categoria ${livro.categoria}, escrito por ${livro.autor}.`}
                    </DescriptionText>
                  </DescriptionSection>

                  <DetailsRow>
                    <DetailItem>
                      <DetailLabel>Categoria</DetailLabel>
                      <DetailValue>{livro.categoria}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Autor</DetailLabel>
                      <DetailValue>{livro.autor}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>ID</DetailLabel>
                      <DetailValue>#{livro.id}</DetailValue>
                    </DetailItem>
                  </DetailsRow>

                  <StockBox $status={livro.estoque > 0 ? 'available' : 'unavailable'}>
                    <StockLabel>Estoque</StockLabel>
                    <StockValue>
                      {livro.estoque > 0 ? `${livro.estoque} unidades disponíveis` : 'Esgotado'}
                    </StockValue>
                  </StockBox>
                </RightColumn>
              </ContentLayout>
            </ModalBody>

            <ModalFooter>
              <BackButton onClick={handleClose}>
                Voltar
              </BackButton>
              <EditButton onClick={handleEdit}>
                Editar Livro
              </EditButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </PageContainer>
    </Navbar>
  );
}
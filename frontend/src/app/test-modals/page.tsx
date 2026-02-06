'use client';

import { useState } from 'react';
import ErrorModal from '@/components/modals/errorModal';
import CancelModal from '@/components/modals/cancelModal';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 20px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 250px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorButton = styled(Button)`
  background: linear-gradient(135deg, #0b4200 0%, #0b4200 100%);
  color: white;
`;

const CancelButton = styled(Button)`
  background: linear-gradient(135deg, #f57c00 0%, #ef6c00 100%);
  color: white;
`;

const ConfirmButton = styled(Button)`
  background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
  color: white;
`;

const SuccessButton = styled(Button)`
  background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
  color: white;
`;

export default function TestModals() {
  const [errorModal, setErrorModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);

  return (
    <Container>
      <Title>Teste de Modais</Title>
      
      <ErrorButton onClick={() => setErrorModal(true)}>
        Abrir Error Modal
      </ErrorButton>

      <CancelButton onClick={() => setCancelModal(true)}>
        Abrir Cancel Modal
      </CancelButton>

      <ConfirmButton onClick={() => setConfirmModal(true)}>
        Abrir Confirm Modal
      </ConfirmButton>

      <SuccessButton onClick={() => setSucessModal(true)}>
        Abrir Success Modal
      </SuccessButton>

      {/* Modais */}
      <ErrorModal
        isOpen={errorModal}
        title="Erro ao processar"
        message="Não foi possível completar sua solicitação. Por favor, verifique os dados informados e tente novamente."
        onClose={() => setErrorModal(false)}
      />

      <CancelModal
        isOpen={cancelModal}
        title="Cancelar operação?"
        message="Tem certeza que deseja cancelar esta operação? Todas as alterações não salvas serão perdidas."
        onConfirm={() => {
          setCancelModal(false);
          alert('Operação cancelada!');
        }}
        onCancel={() => setCancelModal(false)}
      />

      <ConfirmModal
        isOpen={confirmModal}
        title="Confirmar ação"
        message="Deseja realmente prosseguir com esta ação? Esta operação não poderá ser desfeita."
        confirmText="Confirmar"
        cancelText="Voltar"
        onConfirm={() => {
          setConfirmModal(false);
          alert('Ação confirmada!');
        }}
        onCancel={() => setConfirmModal(false)}
      />

      <SucessModal
        isOpen={sucessModal}
        title="Sucesso!"
        message="Sua operação foi concluída com sucesso. Todos os dados foram salvos corretamente."
        buttonText="Entendi"
        onClose={() => setSucessModal(false)}
      />
    </Container>
  );
}
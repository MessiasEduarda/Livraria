'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function PagamentoPendentePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/auth/login');
      return;
    }
    if (user.tipoUsuario !== 'EMPRESA' || !user.bloqueado) {
      router.replace('/home');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || !user.bloqueado) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Carregando...
      </div>
    );
  }

  const mensagem = user.mensagemBloqueio || 'Pagamento pendente. Regularize sua fatura para acessar o sistema.';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
        fontFamily: 'var(--font-metropolis-regular), sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 440,
          width: '100%',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#c62828',
            color: '#fff',
            padding: '24px 20px',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Acesso bloqueado
        </div>
        <div style={{ padding: 28 }}>
          <p style={{ margin: 0, color: '#333', lineHeight: 1.6 }}>{mensagem}</p>
          <p style={{ margin: '16px 0 0', fontSize: 14, color: '#666' }}>
            Entre em contato com o administrador do sistema para regularizar sua situação.
          </p>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace('/auth/login');
            }}
            style={{
              marginTop: 28,
              padding: '12px 24px',
              background: '#2e7d32',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sair e voltar ao login
          </button>
        </div>
      </div>
    </div>
  );
}

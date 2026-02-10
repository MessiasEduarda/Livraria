'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AdminGuardProps {
  children: ReactNode;
}

/**
 * Redireciona vendedores para /minhas-vendas. Apenas administradores veem o conteúdo.
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/auth/login');
      return;
    }
    if (!user.admin) {
      router.replace('/minhas-vendas');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || !user.admin) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          fontFamily: 'var(--font-metropolis-regular), sans-serif',
          color: '#666',
        }}
      >
        Carregando...
      </div>
    );
  }

  return <>{children}</>;
}

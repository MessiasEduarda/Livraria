'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, ReactNode } from 'react';

export default function BloqueioGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !user) return;
    if (user.tipoUsuario !== 'EMPRESA' || !user.bloqueado) return;
    if (pathname === '/auth/login' || pathname === '/pagamento-pendente') return;
    router.replace('/pagamento-pendente');
  }, [user, isLoading, pathname, router]);

  return <>{children}</>;
}

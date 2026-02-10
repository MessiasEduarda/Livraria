'use client';

import AdminGuard from '@/components/AdminGuard';
import Configuracoes from '@/components/configuracoes';

export default function ConfiguracoesPage() {
  return (
    <AdminGuard>
      <Configuracoes />
    </AdminGuard>
  );
}
'use client';

import AdminGuard from '@/components/AdminGuard';
import Relatorios from '@/components/relatorios';

export default function RelatoriosPage() {
  return (
    <AdminGuard>
      <Relatorios />
    </AdminGuard>
  );
}
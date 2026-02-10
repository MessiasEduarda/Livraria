'use client';

import AdminGuard from '@/components/AdminGuard';
import VendedoresComponent from '@/components/vendedores';

export default function VendedoresPage() {
  return (
    <AdminGuard>
      <VendedoresComponent />
    </AdminGuard>
  );
}

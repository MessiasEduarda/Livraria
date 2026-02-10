'use client';

import AdminGuard from '@/components/AdminGuard';
import MetaMensalComponent from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <AdminGuard>
      <MetaMensalComponent />
    </AdminGuard>
  );
}
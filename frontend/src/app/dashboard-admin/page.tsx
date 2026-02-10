'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import DashboardAdminComponent from '@/components/dashboard-admin';

export default function DashboardAdminPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/auth/login');
      return;
    }
    if (user.tipoUsuario !== 'SUPER_ADMIN') {
      router.replace('/home');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.tipoUsuario !== 'SUPER_ADMIN') {
    return null;
  }

  return <DashboardAdminComponent />;
}

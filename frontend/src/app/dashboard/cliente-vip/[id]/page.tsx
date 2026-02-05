'use client';

import { use } from 'react';
import ClienteVIPComponent from '@/components/dashboard/cliente-vip';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ClienteVIPPage({ params }: PageProps) {
  const { id } = use(params);
  
  return <ClienteVIPComponent id={id} />;
}
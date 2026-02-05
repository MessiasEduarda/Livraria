'use client';

import { use } from 'react';
import MetaMensalComponent from '@/components/dashboard/meta-mensal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MetaMensalPage({ params }: PageProps) {
  const { id } = use(params);
  
  return <MetaMensalComponent id={id} />;
}
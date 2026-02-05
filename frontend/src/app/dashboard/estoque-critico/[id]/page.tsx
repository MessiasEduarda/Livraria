'use client';

import { use } from 'react';
import EstoqueCriticoComponent from '@/components/dashboard/estoque-critico';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EstoqueCriticoPage({ params }: PageProps) {
  const { id } = use(params);
  
  return <EstoqueCriticoComponent id={id} />;
}
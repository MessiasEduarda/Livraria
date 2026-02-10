'use client';

import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';

interface EditablePageTitleProps {
  pageKey: string;
  defaultTitle: string;
  /** Componente de título (ex.: Title dos styles da página) que recebe children */
  children?: (title: string) => ReactNode;
  /** Se não passar children, usa um span com o texto */
  className?: string;
}

export default function EditablePageTitle({ pageKey, defaultTitle, children, className }: EditablePageTitleProps) {
  const { config, setConfig } = useConfig();
  const { user } = useAuth();
  const isAdmin = user?.admin === true;
  const title = config.pageTitles?.[pageKey] ?? defaultTitle;
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleStartEdit = () => {
    setEditValue(config.pageTitles?.[pageKey] ?? defaultTitle);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    setConfig({ pageTitles: { ...config.pageTitles, [pageKey]: trimmed || defaultTitle } });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditValue(config.pageTitles?.[pageKey] ?? defaultTitle);
    setEditing(false);
  };

  if (editing && isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
          style={{
            flex: 1,
            minWidth: 120,
            fontSize: 'inherit',
            fontWeight: 'inherit',
            padding: '4px 8px',
            border: '1px solid #6366f1',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.05)',
            color: 'inherit',
          }}
          autoFocus
        />
        <button
          type="button"
          onClick={handleSave}
          aria-label="Salvar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 6,
            border: 'none',
            borderRadius: 6,
            background: '#22c55e',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <Check size={18} />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          aria-label="Cancelar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 6,
            border: 'none',
            borderRadius: 6,
            background: '#64748b',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {children ? children(title) : <span className={className}>{title}</span>}
      {isAdmin && (
        <button
          type="button"
          onClick={handleStartEdit}
          aria-label="Editar título"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            border: 'none',
            borderRadius: 6,
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <Pencil size={18} />
        </button>
      )}
    </div>
  );
}

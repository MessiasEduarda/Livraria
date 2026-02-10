'use client';

import { useState } from 'react';
import { useConfig } from '@/context/ConfigContext';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';
import * as S from './styles';

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
      <S.Wrapper>
        <S.EditInput
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
          autoFocus
          aria-label="Editar título"
        />
        <S.ButtonGroup>
          <S.SaveButton type="button" onClick={handleSave} aria-label="Salvar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </S.SaveButton>
          <S.CancelButton type="button" onClick={handleCancel} aria-label="Cancelar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </S.CancelButton>
        </S.ButtonGroup>
      </S.Wrapper>
    );
  }

  return (
    <S.TitleWrapper>
      {children ? children(title) : <span className={className}>{title}</span>}
      {isAdmin && (
        <S.EditTriggerButton type="button" onClick={handleStartEdit} aria-label="Editar título">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </S.EditTriggerButton>
      )}
    </S.TitleWrapper>
  );
}

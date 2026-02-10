'use client';

import { useState, useRef, useEffect } from 'react';
import * as S from './styles';

export interface FormDropdownOption {
  value: string;
  label: string;
}

interface FormDropdownProps {
  options: FormDropdownOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
  id?: string;
  /** Quantas opções visíveis antes de aparecer scroll (ex: 3 para Status) */
  maxVisibleOptions?: number;
  /** Se true, não mostra a opção "placeholder" na lista (só as opções de options) */
  hidePlaceholderOption?: boolean;
}

export default function FormDropdown({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Selecione...',
  hasError = false,
  id,
  maxVisibleOptions,
  hidePlaceholderOption = false,
}: FormDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = value ? (options.find(o => o.value === value)?.label ?? value) : '';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  return (
    <S.Wrapper ref={wrapperRef} $hasError={hasError}>
      <S.Trigger
        type="button"
        id={id}
        $hasError={hasError}
        onClick={() => setOpen(!open)}
        onBlur={() => {}}
      >
        <span>{selectedLabel || placeholder}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: open ? 'rotate(180deg)' : undefined }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </S.Trigger>
      {open && (
        <S.List $maxVisibleOptions={maxVisibleOptions}>
          {!hidePlaceholderOption && (
            <S.Option
              $active={!value}
              onClick={() => {
                onChange('');
                setOpen(false);
                onBlur?.();
              }}
            >
              {placeholder}
            </S.Option>
          )}
          {options.map(opt => (
            <S.Option
              key={opt.value}
              $active={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                onBlur?.();
              }}
            >
              {opt.label}
            </S.Option>
          ))}
        </S.List>
      )}
    </S.Wrapper>
  );
}

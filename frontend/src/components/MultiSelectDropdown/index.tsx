'use client';

import { useState, useRef, useEffect } from 'react';
import * as S from './styles';

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
  /** Número de opções visíveis antes do scroll (ex: 3) */
  maxVisibleOptions?: number;
}

export default function MultiSelectDropdown({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Selecione...',
  hasError = false,
  maxVisibleOptions = 3,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean) as string[];
  const triggerText = selectedLabels.length > 0 ? selectedLabels.join(', ') : '';

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  return (
    <S.Wrapper ref={wrapperRef} $hasError={hasError}>
      <S.Trigger
        type="button"
        $hasError={hasError}
        onClick={() => setOpen(!open)}
      >
        <span>{triggerText || placeholder}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: open ? 'rotate(180deg)' : undefined }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </S.Trigger>
      {open && (
        <S.List $maxVisibleOptions={maxVisibleOptions}>
          {options.map((opt) => {
            const selected = value.includes(opt.value);
            return (
              <S.OptionRow
                key={opt.value}
                $selected={selected}
                onClick={() => toggle(opt.value)}
              >
                <span>{opt.label}</span>
                {selected && (
                  <S.CheckIcon aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </S.CheckIcon>
                )}
              </S.OptionRow>
            );
          })}
        </S.List>
      )}
    </S.Wrapper>
  );
}

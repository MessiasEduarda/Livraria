'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as S from './styles';

const PAGE_SIZE_DEFAULT = 4;
const GREEN = '#3CAD8C';

export interface PaginationProps {
  total: number;
  pageSize?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  /** Texto ex: "empresas" | "livros" | "clientes" */
  itemLabel?: string;
}

function buildPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | 'ellipsis')[] = [];
  if (currentPage <= 3) {
    pages.push(1, 2, 3, 'ellipsis', totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, 'ellipsis', currentPage, 'ellipsis', totalPages);
  }
  return pages;
}

export default function Pagination({
  total,
  pageSize = PAGE_SIZE_DEFAULT,
  currentPage,
  onPageChange,
  itemLabel = 'itens',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  const showing = total === 0 ? 0 : end - start + 1;

  if (total <= pageSize) return null;

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <S.Wrapper>
      <S.Info>
        Mostrando {showing} de {total}
      </S.Info>
      <S.Nav>
        <S.ArrowButton
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} color={currentPage <= 1 ? '#9ca3af' : GREEN} />
        </S.ArrowButton>
        {pageNumbers.map((p, i) =>
          p === 'ellipsis' ? (
            <S.Ellipsis key={`ell-${i}`}>...</S.Ellipsis>
          ) : (
            <S.PageButton
              key={p}
              type="button"
              $active={currentPage === p}
              onClick={() => onPageChange(p)}
              aria-label={`Página ${p}`}
              aria-current={currentPage === p ? 'page' : undefined}
            >
              {p}
            </S.PageButton>
          )
        )}
        <S.ArrowButton
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight size={20} color={currentPage >= totalPages ? '#9ca3af' : GREEN} />
        </S.ArrowButton>
      </S.Nav>
    </S.Wrapper>
  );
}

export { PAGE_SIZE_DEFAULT };

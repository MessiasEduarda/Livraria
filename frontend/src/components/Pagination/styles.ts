import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 20px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
`;

export const Info = styled.span`
  font-size: 0.9rem;
  color: #9ca3af;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  padding: 0;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: rgba(60, 173, 140, 0.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 50%;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(p) => (p.$active ? '#3CAD8C' : 'transparent')};
  color: ${(p) => (p.$active ? '#ffffff' : '#9ca3af')};

  &:hover {
    background: ${(p) => (p.$active ? '#2e8f72' : 'rgba(60, 173, 140, 0.15)')};
    color: ${(p) => (p.$active ? '#fff' : '#3CAD8C')};
  }
`;

export const Ellipsis = styled.span`
  font-size: 0.9rem;
  color: #9ca3af;
  padding: 0 4px;
  user-select: none;
`;

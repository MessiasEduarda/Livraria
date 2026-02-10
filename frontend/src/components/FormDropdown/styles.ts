import styled from 'styled-components';

export const Wrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  width: 100%;
`;

export const Trigger = styled.button<{ $hasError?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ab031d' : '#ddd'};
  border-radius: 12px;
  background-color: white;
  color: #333;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ab031d' : '#3CAD8C'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(171, 3, 29, 0.1)' : 'rgba(60, 173, 140, 0.1)'};
  }

  span:first-child {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
`;

/* maxVisibleOptions: altura fixa para caber exatamente N opções (evita aparecer N+1) */
const listMaxHeight = (n: number) => {
  if (n <= 2) return '84px';   /* 2 opções visíveis, resto com scroll */
  if (n === 3) return '132px';
  return `calc(${n} * 44px)`;
};
export const List = styled.div<{ $maxVisibleOptions?: number }>`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 20;
  max-height: ${props => props.$maxVisibleOptions != null
    ? listMaxHeight(props.$maxVisibleOptions)
    : '260px'};
  overflow-y: auto;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: slideDown 0.2s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3CAD8C;
    border-radius: 10px;
  }
`;

export const Option = styled.div<{ $active?: boolean }>`
  padding: 12px 16px;
  color: ${props => props.$active ? '#3CAD8C' : '#333'};
  font-weight: ${props => props.$active ? '600' : '400'};
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  font-size: 0.9rem;
  background-color: ${props => props.$active ? '#e8f5f3' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e8f5f3;
    color: #3CAD8C;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

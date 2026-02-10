import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const EditInput = styled.input`
  flex: 1;
  min-width: 140px;
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #1a1a1a;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3CAD8C;
    box-shadow: 0 0 0 3px rgba(60, 173, 140, 0.15);
  }

  &::placeholder {
    color: #999;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: #3CAD8C;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2a8569;
    transform: translateY(-1px);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(60, 173, 140, 0.3);
  }
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid #ddd;
  border-radius: 12px;
  background: white;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #94a3b8;
    color: #475569;
    background: #f8fafc;
  }
  &:focus {
    outline: none;
    border-color: #94a3b8;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const EditTriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #3CAD8C;
    background: rgba(60, 173, 140, 0.1);
  }
  &:focus {
    outline: none;
    color: #3CAD8C;
  }
`;

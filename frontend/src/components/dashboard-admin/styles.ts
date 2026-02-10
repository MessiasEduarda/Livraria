import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 231px;
  padding: 40px;
  width: calc(100% - 231px);
  max-width: calc(100% - 231px);
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  margin-top: 3rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    max-width: 100%;
    padding: 24px 20px;
    margin-top: 2rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #dee2e6;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #3CAD8C;
  margin: 0 0 8px 0;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: #e5e7eb;
  }
`;

export const StatIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => `${props.$color}18`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${props => props.$color};
`;

export const StatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  margin-bottom: 4px;
`;

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
`;

// --- Empresas ---
export const Section = styled.section`
  margin-top: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  margin: 0;
`;

export const SectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TableWrap = styled.div`
  width: 100%;
  overflow: visible;
  min-height: 320px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  table-layout: fixed;
`;

export const Th = styled.th`
  text-align: left;
  padding: 14px 12px;
  margin: 0;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 14px 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TdEmail = styled(Td)`
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Tr = styled.tr`
  &:hover {
    background: #fafafa;
  }
`;

export const Badge = styled.span<{ $ativo?: boolean }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${p => (p.$ativo ? '#d1fae5' : '#fee2e2')};
  color: ${p => (p.$ativo ? '#065f46' : '#991b1b')};
`;

export const ActionBtnGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
`;

export const ActionBtn = styled.button<{ $danger?: boolean }>`
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  background: ${p => (p.$danger ? '#dc2626' : '#3CAD8C')};
  color: ${p => (p.$danger ? '#fff' : '#fff')};
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${p => (p.$danger ? '#b91c1c' : '#2e8f72')};
  }
`;

export const IconActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #1a1a1a;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  svg {
    stroke: currentColor;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  margin: 0;
  color: #1a1a1a;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  border-radius: 8px;
  &:hover {
    background: #f3f4f6;
    color: #1a1a1a;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fafafa;
`;

export const FormGroup = styled.div`
  margin-bottom: 18px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  box-sizing: border-box;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #3CAD8C;
    box-shadow: 0 0 0 3px rgba(60, 173, 140, 0.15);
  }
`;

export const FormInputWrapper = styled.div`
  position: relative;
  width: 100%;
  .input-with-toggle {
    padding-right: 44px;
  }
`;

export const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: #6b7280;
  border-radius: 6px;
  &:hover {
    color: #374151;
    background: #f3f4f6;
  }
`;

export const FormCheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 6px;
`;

export const FormCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
`;

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #3CAD8C;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2e8f72;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RelatorioSection = styled.section`
  margin-top: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

export const RelatorioSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
`;

export const RelatorioSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  margin: 0;
`;

export const RelatorioSectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RelatorioTableWrap = styled.div`
  width: 100%;
  overflow: visible;
`;

export const RelatorioTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  table-layout: fixed;
`;

export const RelatorioTh = styled.th`
  text-align: left;
  padding: 14px 16px;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const RelatorioTd = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

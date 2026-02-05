import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  margin-left: 231px;
  padding: 40px;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #0b4200;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const QuickActionsPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

export const QuickActionCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const QuickActionIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f7ed;
  border-radius: 12px;
  flex-shrink: 0;
  color: #0b4200;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const QuickActionTitle = styled.h3`
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  font-weight: 600;
`;

export const QuickActionDescription = styled.p`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const ContentSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  font-weight: 600;
`;

export const ReportTypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

export const ReportTypeCard = styled.div<{ $selected: boolean; $color: string }>`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid ${props => props.$selected ? '#0b4200' : 'transparent'};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$selected ? '#0b4200' : props.$color};
    opacity: ${props => props.$selected ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

export const ReportBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #856404;
  border-radius: 12px;
  font-size: 0.7rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ReportIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

export const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReportTitle = styled.h3`
  font-size: 1.15rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
`;

export const ReportDescription = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const FiltersPanel = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  overflow: hidden;
`;

export const FiltersPanelHeader = styled.div`
  background: linear-gradient(135deg, #0b4200 0%, #28a745 100%);
  padding: 20px 24px;
`;

export const FiltersPanelTitle = styled.h3`
  font-size: 1.2rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: white;
  margin: 0;
  font-weight: 600;
`;

export const FilterGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  span {
    color: #666;
    font-size: 0.9rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    font-weight: 500;
  }
`;

export const DateInput = styled.input`
  flex: 1;
  min-width: 160px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #0b4200;
  }
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #0b4200;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;
`;

export const GenerateButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border: none;
  border-radius: 10px;
  background: ${props => props.disabled ? '#ccc' : 'linear-gradient(135deg, #0b4200 0%, #28a745 100%)'};
  color: white;
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(11, 66, 0, 0.2);

  &:hover {
    ${props => !props.disabled && `
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(11, 66, 0, 0.3);
    `}
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  color: #666;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
    color: #333;
  }
`;

export const PreviewSection = styled.div`
  margin-bottom: 32px;
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #0b4200;
  margin: 0;
  font-weight: 600;
`;

export const ExportOptions = styled.div`
  display: flex;
  gap: 10px;
`;

export const ExportButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #0b4200;
  color: white;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? '0.6' : '1'};

  &:hover {
    ${props => !props.disabled && `
      background-color: #002e10;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(11, 66, 0, 0.3);
    `}
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ReportPreview = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ReportContent = styled.div`
  padding: 48px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 3px solid #0b4200;
  flex-wrap: wrap;
  gap: 24px;
`;

export const ReportLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    color: #0b4200;
  }

  h1 {
    font-size: 1.8rem;
    font-family: var(--font-cabourg-bold), 'Cabourg', serif;
    color: #0b4200;
    margin: 0;
    font-weight: 700;
  }

  p {
    font-size: 0.9rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #666;
    margin: 4px 0 0 0;
  }
`;

export const ReportMetadata = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetadataLabel = styled.span`
  font-size: 0.75rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const MetadataValue = styled.span`
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #333;
  font-weight: 600;
`;

export const ReportSection = styled.section`
  margin: 32px 0;

  &:first-child {
    margin-top: 0;
  }
`;

export const SectionDivider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(to right, #0b4200, transparent);
  margin: 32px 0;
`;

export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, #f8fdf5 0%, #e8f5e0 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #0b4200;
`;

export const StatLabel = styled.div`
  font-size: 0.85rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 1.8rem;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  color: #0b4200;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1;
`;

export const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 0.8rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: ${props => props.$positive ? '#059669' : '#dc2626'};
  font-weight: 600;

  &::before {
    content: '${props => props.$positive ? '↗' : '↘'}';
    margin-right: 4px;
  }
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background: linear-gradient(135deg, #0b4200 0%, #28a745 100%);
`;

export const TableRow = styled.tr<{ $isHeader?: boolean }>`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  ${props => !props.$isHeader && `
    &:hover {
      background-color: #f8fdf5;
    }
  `}
`;

export const TableHeaderCell = styled.th`
  padding: 14px 16px;
  text-align: left;
  font-size: 0.85rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TableCell = styled.td`
  padding: 14px 16px;
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
`;

export const ChartContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
`;

export const ChartTitle = styled.h4`
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  color: #333;
  margin: 0 0 24px 0;
  font-weight: 600;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 350px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: #999;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  svg {
    margin-bottom: 24px;
    opacity: 0.3;
  }

  h3 {
    font-size: 1.5rem;
    font-family: var(--font-cabourg-bold), 'Cabourg', serif;
    color: #666;
    margin: 0 0 12px 0;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #999;
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 1.3rem;
    font-family: var(--font-cabourg-bold), 'Cabourg', serif;
    color: #0b4200;
    margin: 16px 0 8px 0;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
    color: #666;
    margin: 0;
  }
`;

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
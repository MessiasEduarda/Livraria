import styled from 'styled-components';

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
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 120px;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
  }
`;

export const SidebarItem = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: none;
  border-radius: 12px;
  background-color: ${props => props.$active ? '#e8f5e0' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;

  &:hover {
    background-color: ${props => props.$active ? '#e8f5e0' : '#f8f9fa'};
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 8px;
    padding: 12px 8px;
    text-align: center;
  }
`;

export const SidebarIcon = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? '#0b4200' : '#666'};
  flex-shrink: 0;
`;

export const SidebarLabel = styled.span`
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #333;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 0.85rem;
    text-align: center;
  }
`;

export const MainContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Section = styled.section`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

export const SectionDescription = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const SettingsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 16px;
  border-radius: 12px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const SettingLabel = styled.label`
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 4px;
`;

export const SettingDescription = styled.p`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const SettingControl = styled.div`
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Toggle = styled.button<{ checked: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background-color: ${props => props.checked ? '#0b4200' : '#ccc'};
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${props => props.checked ? '#002e10' : '#999'};
  }
`;

export const ToggleSlider = styled.div<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 3px;
  left: ${props => props.$checked ? '27px' : '3px'};
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
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

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0b4200;
    box-shadow: 0 0 0 3px rgba(11, 66, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid #0b4200;
  border-radius: 10px;
  background-color: white;
  color: #0b4200;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0b4200;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 66, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  background-color: #0b4200;
  color: white;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(11, 66, 0, 0.2);

  &:hover {
    background-color: #002e10;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(11, 66, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  padding: 12px 28px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  color: #333;
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 32px 0;
`;

export const InfoCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background-color: #e8f5e0;
  border-left: 4px solid #0b4200;
`;

export const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #0b4200;
`;

export const InfoContent = styled.div`
  flex: 1;
`;

export const InfoTitle = styled.h4`
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #0b4200;
  margin: 0 0 4px 0;
`;

export const InfoDescription = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #333;
  margin: 0;
  line-height: 1.6;
`;

export const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ColorPreview = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.$color};
  border: 2px solid #ddd;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0b4200 0%, #28a745 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(11, 66, 0, 0.2);
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileName = styled.h3`
  font-size: 1.2rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
`;

export const ProfileEmail = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  color: #333;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #0b4200;
    color: #0b4200;
  }
`;

export const DangerZone = styled.div`
  padding: 24px;
  border-radius: 12px;
  background-color: #fff5f5;
  border: 1px solid #fee;
`;

export const DangerTitle = styled.h3`
  font-size: 1.2rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #dc2626;
  margin: 0 0 8px 0;
`;

export const DangerDescription = styled.p`
  font-size: 0.9rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0 0 16px 0;
`;

export const DangerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #dc2626;
  border-radius: 8px;
  background-color: white;
  color: #dc2626;
  font-size: 0.9rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dc2626;
    color: white;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

export const NotificationIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => `${props.$color}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: ${props => props.$color};
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
`;

export const NotificationTitle = styled.h4`
  font-size: 0.95rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
`;

export const NotificationDescription = styled.p`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const BackupCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const BackupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

export const BackupTitle = styled.h4`
  font-size: 1rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const BackupSize = styled.span`
  font-size: 0.85rem;
  font-family: var(--font-metropolis-regular), 'Metropolis', sans-serif;
  color: #666;
  padding: 4px 10px;
  background-color: white;
  border-radius: 6px;
`;

export const BackupDate = styled.p`
  font-size: 0.85rem;
  font-family: var(--font-inter-variable-regular), 'Inter', sans-serif;
  color: #666;
  margin: 0;
`;

export const BackupActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const BackupButton = styled.button<{ $type: 'download' | 'restore' | 'delete' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid ${props => {
    if (props.$type === 'delete') return '#dc2626';
    if (props.$type === 'restore') return '#2563eb';
    return '#0b4200';
  }};
  border-radius: 8px;
  background-color: white;
  color: ${props => {
    if (props.$type === 'delete') return '#dc2626';
    if (props.$type === 'restore') return '#2563eb';
    return '#0b4200';
  }};
  font-size: 0.85rem;
  font-family: var(--font-metropolis-semibold), 'Metropolis', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => {
      if (props.$type === 'delete') return '#dc2626';
      if (props.$type === 'restore') return '#2563eb';
      return '#0b4200';
    }};
    color: white;
  }
`;
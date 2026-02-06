import Link from 'next/link';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const ContentWrapper = styled.div`
  margin-left: 30px;
  width: calc(100% - 280px);
  min-height: 100vh;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding-top: 60px;
  }
`;

interface NavbarContainerProps {
  $isOpen: boolean;
}

export const NavbarContainer = styled.div<NavbarContainerProps>`
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  height: 100vh;
  padding: 24px;
  background-color: #1b1b1b;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    
    .close-btn {
      display: block !important;
    }
  }

  @media (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    max-width: 280px;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  background-color: #2C3E50;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;

  &:hover {
    background-color: #34495E;
  }

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Overlay = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export const LogoButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  margin-bottom: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`;

export const LogoImg = styled.img`
  width: 250px;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  margin: 0;

  @media (max-width: 768px) {
    width: 220px;
  }
`;

export const TitleText = styled.h1`
  font-family: var(--font-cabourg-bold), 'Cabourg', serif;
  font-size: 28px;
  
  color: #fff;
  text-align: center;
  margin: -75px 0 40px 0;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const DividerTop = styled.div`
  width: 100%;
  height: 1px;
  background-color: #535353;
  margin: 15px 0;
`;

export const DividerBottom = styled.div`
  width: 130%;
  height: 1px;
  background-color: #535353;
  margin: 15px 0;
`;

export const NewSaleButton = styled.button`
  width: 100%;
  border: none;
  background: linear-gradient(135deg, #3CAD8C 0%, #2d9171 100%);
  padding: 14px 20px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  color: #fff;
  border-radius: 12px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(60, 173, 140, 0.3);
  margin-left: 1.5rem;

  svg {
    color: #fff;
    transition: all 0.3s;
  }

  &:hover {
    background: linear-gradient(135deg, #3CAD8C 0%, #2a8569 100%);
    box-shadow: 0 6px 16px rgba(1, 255, 179, 0.07);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(1, 255, 179, 0.07);
  }

  @media (max-width: 768px) {
    padding: 12px 18px;
    font-size: 15px;
    gap: 8px;
  }
`;

export const Nav = styled.nav`
  width: calc(100% + 24px);
  margin-left: -24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 5px;
`;

interface NavLinkProps {
  selected: boolean;
}

export const NavLinkIcon = styled.div<NavLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ selected }) => (selected ? '#3CAD8C' : '#95A5A6')};
    transition: all 0.3s;
  }
`;

export const NavLinkText = styled.span<NavLinkProps>`
  font-family: var(--font-roboto-regular), 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  font-style: normal;
  color: ${({ selected }) => (selected ? '#3CAD8C' : '#95A5A6')};
  white-space: nowrap;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  transition: all 0.3s;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const NavLink = styled(Link)<NavLinkProps>`
  width: 100%;
  padding: 14px 24px 14px 35px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: 0 25px 25px 0;
  background: ${({ selected }) => (selected ? 'rgba(1, 255, 179, 0.07)' : 'transparent')};
  text-decoration: none;
  transition: all 0.3s;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${({ selected }) => (selected ? '#3CAD8C' : 'transparent')};
    transition: all 0.3s;
  }

  &:hover {
    background: rgba(1, 255, 179, 0.07);

    &::before {
      background-color: #3CAD8C;
    }

    ${NavLinkText} {
      font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
      font-weight: 600;
      font-style: normal;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0%;
      vertical-align: middle;
      color: #3CAD8C;
    }

    ${NavLinkIcon} {
      svg {
        color: #3CAD8C;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 12px 24px 12px 35px;
    gap: 12px;
  }
`;

export const LogoutButton = styled.button`
  width: calc(100% + 24px);
  margin-left: -24px;
  border: none;
  background: transparent;
  padding: 14px 24px 14px 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-roboto-regular), 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #95A5A6;
  border-radius: 0 25px 25px 0;
  transition: all 0.3s;
  position: relative;

  svg {
    color: #95A5A6;
    transition: all 0.3s;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: transparent;
    transition: all 0.3s;
  }

  &:hover {
    background: rgba(119, 64, 64, 0.07);
    
    &::before {
      background-color: #E74C3C;
    }

    font-family: var(--font-roboto-medium), 'Roboto', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
    vertical-align: middle;
    color: #E74C3C;

    svg {
      color: #E74C3C;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 24px 12px 35px;
    gap: 12px;
    font-size: 15px;
  }
`;
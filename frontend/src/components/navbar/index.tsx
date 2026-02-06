'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  NavbarContainer,
  LogoButton,
  LogoImg,
  TitleText,
  DividerTop,
  DividerBottom,
  Nav,
  NavLink,
  NavLinkIcon,
  NavLinkText,
  LogoutButton,
  MobileMenuButton,
  Overlay,
  ContentWrapper,
  PageWrapper,
  NewSaleButton,
} from './styles';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Limpa o localStorage
    localStorage.clear();
    
    // Limpa o sessionStorage
    sessionStorage.clear();
    
    // Remove cookies se houver
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Redireciona para a página de login
    router.push('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <PageWrapper>
      <MobileMenuButton onClick={toggleMenu}>
        <Menu size={24} />
      </MobileMenuButton>

      {isOpen && <Overlay onClick={closeMenu} />}

      <NavbarContainer $isOpen={isOpen}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <LogoButton type="button">
              <LogoImg 
                src="/logo.png" 
                alt="Logo Livraria" 
              />
            </LogoButton>
            <MobileMenuButton 
              onClick={toggleMenu} 
              style={{ display: 'none', position: 'absolute', right: '20px', top: '20px' }}
              className="close-btn"
            >
              <X size={24} color="#fff" />
            </MobileMenuButton>
          </div>

          <TitleText>Entre Capítulos</TitleText>

          <DividerTop />

          <Nav>
            <NavLink href="/home" onClick={closeMenu} selected={pathname === '/home'}>
              <NavLinkIcon selected={pathname === '/home'}>
                <BookOpen size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/home'}>
                Livros
              </NavLinkText>
            </NavLink>

            <NavLink href="/estoque" onClick={closeMenu} selected={pathname === '/estoque'}>
              <NavLinkIcon selected={pathname === '/estoque'}>
                <Package size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/estoque'}>
                Estoque
              </NavLinkText>
            </NavLink>

            <NavLink href="/vendas" onClick={closeMenu} selected={pathname === '/vendas'}>
              <NavLinkIcon selected={pathname === '/vendas'}>
                <ShoppingCart size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/vendas'}>
                Vendas
              </NavLinkText>
            </NavLink>

            <NavLink href="/clientes" onClick={closeMenu} selected={pathname === '/clientes'}>
              <NavLinkIcon selected={pathname === '/clientes'}>
                <Users size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/clientes'}>
                Clientes
              </NavLinkText>
            </NavLink>

            <NavLink href="/relatorios" onClick={closeMenu} selected={pathname === '/relatorios'}>
              <NavLinkIcon selected={pathname === '/relatorios'}>
                <BarChart3 size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/relatorios'}>
                Relatórios
              </NavLinkText>
            </NavLink>

            <NavLink href="/dashboard" onClick={closeMenu} selected={pathname === '/dashboard'}>
              <NavLinkIcon selected={pathname === '/dashboard'}>
                <LayoutDashboard size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/dashboard'}>
                Dashboard
              </NavLinkText>
            </NavLink>

            <NavLink href="/configuracoes" onClick={closeMenu} selected={pathname === '/configuracoes'}>
              <NavLinkIcon selected={pathname === '/configuracoes'}>
                <Settings size={24} />
              </NavLinkIcon>
              <NavLinkText selected={pathname === '/configuracoes'}>
                Configurações
              </NavLinkText>
            </NavLink>
          </Nav>
        </div>

        <div>
          <NewSaleButton as={Link} href="/novavenda" onClick={closeMenu}>
            <Plus size={20} />
            Nova Venda
          </NewSaleButton>

          <DividerBottom />

          <LogoutButton type="button" onClick={handleLogout}>
            <LogOut size={24} />
            Sair da conta
          </LogoutButton>
        </div>
      </NavbarContainer>

      {children && <ContentWrapper>{children}</ContentWrapper>}
    </PageWrapper>
  );
};

export default Navbar;
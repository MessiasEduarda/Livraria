'use client';

import { usePathname, useRouter } from 'next/navigation';
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
  Plus,
  ClipboardList,
  UserCog,
  Building2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useConfig } from '@/context/ConfigContext';

import {
  NavbarContainer,
  LogoButton,
  LogoImg,
  TitleText,
  GreetingText,
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
} from './styles';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { config } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = user?.admin === true;
  /** Para EMPRESA: só mostra item se tiver permissão (ou se permissoes não veio = mostra tudo) */
  const hasAcesso = (permissao: string) =>
    user?.tipoUsuario !== 'EMPRESA' || !user?.permissoes?.length || user.permissoes.includes(permissao);

  // Redireciona para login se não estiver autenticado (evita acesso direto por URL)
  useEffect(() => {
    if (isLoading) return;
    if (!user && pathname !== '/auth/login') {
      router.replace('/auth/login');
    }
  }, [user, isLoading, pathname, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
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

          <TitleText>{config.storeName}</TitleText>
          <GreetingText>Olá, {user?.nome ?? 'Usuário'}</GreetingText>

          <DividerTop />

          <Nav>
            {user?.tipoUsuario === 'SUPER_ADMIN' && (
              <NavLink href="/dashboard-admin" onClick={closeMenu} selected={pathname === '/dashboard-admin'}>
                <NavLinkIcon selected={pathname === '/dashboard-admin'}>
                  <Building2 size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/dashboard-admin'}>
                  Painel do Sistema
                </NavLinkText>
              </NavLink>
            )}
            {hasAcesso('LIVROS') && (
              <NavLink href="/home" onClick={closeMenu} selected={pathname === '/home'}>
                <NavLinkIcon selected={pathname === '/home'}>
                  <BookOpen size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/home'}>
                  {config.pageTitles?.home ?? 'Livros'}
                </NavLinkText>
              </NavLink>
            )}

            {hasAcesso('ESTOQUE') && (
              <NavLink href="/estoque" onClick={closeMenu} selected={pathname === '/estoque'}>
                <NavLinkIcon selected={pathname === '/estoque'}>
                  <Package size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/estoque'}>
                  {config.pageTitles?.estoque ?? 'Estoque'}
                </NavLinkText>
              </NavLink>
            )}

            {hasAcesso('VENDAS') && (
              <NavLink href="/vendas" onClick={closeMenu} selected={pathname === '/vendas'}>
                <NavLinkIcon selected={pathname === '/vendas'}>
                  <ShoppingCart size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/vendas'}>
                  {config.pageTitles?.vendas ?? 'Vendas'}
                </NavLinkText>
              </NavLink>
            )}

{hasAcesso('CLIENTES') && (
                <NavLink href="/clientes" onClick={closeMenu} selected={pathname === '/clientes'}>
                <NavLinkIcon selected={pathname === '/clientes'}>
                  <Users size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/clientes'}>
                  {config.pageTitles?.clientes ?? 'Clientes'}
                </NavLinkText>
              </NavLink>
            )}

            {!isAdmin && hasAcesso('VENDAS') && (
              <NavLink href="/novavenda" onClick={closeMenu} selected={pathname === '/novavenda'}>
                <NavLinkIcon selected={pathname === '/novavenda'}>
                  <Plus size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/novavenda'}>
                  Nova Venda
                </NavLinkText>
              </NavLink>
            )}

            {!isAdmin && (
              <NavLink href="/minhas-vendas" onClick={closeMenu} selected={pathname === '/minhas-vendas'}>
                <NavLinkIcon selected={pathname === '/minhas-vendas'}>
                  <ClipboardList size={24} />
                </NavLinkIcon>
                <NavLinkText selected={pathname === '/minhas-vendas'}>
                  {config.pageTitles?.minhasVendas ?? 'Minhas Vendas'}
                </NavLinkText>
              </NavLink>
            )}

            {isAdmin && (
              <>
                {hasAcesso('RELATORIOS') && (
                  <NavLink href="/relatorios" onClick={closeMenu} selected={pathname === '/relatorios'}>
                    <NavLinkIcon selected={pathname === '/relatorios'}>
                      <BarChart3 size={24} />
                    </NavLinkIcon>
                    <NavLinkText selected={pathname === '/relatorios'}>
                      {config.pageTitles?.relatorios ?? 'Relatórios'}
                    </NavLinkText>
                  </NavLink>
                )}

                {hasAcesso('DASHBOARD') && (
                  <NavLink href="/dashboard" onClick={closeMenu} selected={pathname === '/dashboard'}>
                    <NavLinkIcon selected={pathname === '/dashboard'}>
                      <LayoutDashboard size={24} />
                    </NavLinkIcon>
                    <NavLinkText selected={pathname === '/dashboard'}>
                      {config.pageTitles?.dashboard ?? 'Dashboard'}
                    </NavLinkText>
                  </NavLink>
                )}

                {hasAcesso('VENDEDORES') && (
                  <NavLink href="/vendedores" onClick={closeMenu} selected={pathname === '/vendedores'}>
                    <NavLinkIcon selected={pathname === '/vendedores'}>
                      <UserCog size={24} />
                    </NavLinkIcon>
                    <NavLinkText selected={pathname === '/vendedores'}>
                      Vendedores
                    </NavLinkText>
                  </NavLink>
                )}

                {hasAcesso('VENDAS') && (
                  <NavLink href="/novavenda" onClick={closeMenu} selected={pathname === '/novavenda'}>
                    <NavLinkIcon selected={pathname === '/novavenda'}>
                      <Plus size={24} />
                    </NavLinkIcon>
                    <NavLinkText selected={pathname === '/novavenda'}>
                      Nova Venda
                    </NavLinkText>
                  </NavLink>
                )}

                {hasAcesso('CONFIGURACOES') && (
                  <NavLink href="/configuracoes" onClick={closeMenu} selected={pathname === '/configuracoes'}>
                    <NavLinkIcon selected={pathname === '/configuracoes'}>
                      <Settings size={24} />
                    </NavLinkIcon>
                    <NavLinkText selected={pathname === '/configuracoes'}>
                      {config.pageTitles?.configuracoes ?? 'Configurações'}
                    </NavLinkText>
                  </NavLink>
                )}
              </>
            )}
          </Nav>
        </div>

        <div>
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
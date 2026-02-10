'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Trash2, X, UserPlus } from 'lucide-react';
import Navbar from '@/components/navbar';
import { useAuth } from '@/hooks/useAuth';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import ErrorModal from '@/components/modals/errorModal';
import {
  listarVendedores,
  criarVendedor,
  excluirVendedor,
  type UsuarioDTO,
  type CriarVendedorRequest,
} from '@/services/api';
import * as S from './styles';

function getIniciais(nome: string): string {
  const parts = nome.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (nome[0] || '').toUpperCase();
}

function validarForm(data: { nome: string; email: string; senha: string; confirmarSenha: string }) {
  const erros: Record<string, string> = {};
  if (!data.nome.trim()) erros.nome = 'Nome é obrigatório.';
  else if (data.nome.trim().length < 2) erros.nome = 'Nome deve ter pelo menos 2 caracteres.';
  if (!data.email.trim()) erros.email = 'E-mail é obrigatório.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) erros.email = 'E-mail inválido.';
  if (!data.senha) erros.senha = 'Senha é obrigatória.';
  else if (data.senha.length < 6) erros.senha = 'Senha deve ter no mínimo 6 caracteres.';
  if (data.senha !== data.confirmarSenha) erros.confirmarSenha = 'As senhas não coincidem.';
  return erros;
}

export default function VendedoresComponent() {
  const { user } = useAuth();
  const [vendedores, setVendedores] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; nome: string } | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [formErros, setFormErros] = useState<Record<string, string>>({});

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const lista = await listarVendedores();
      setVendedores(lista);
    } catch {
      setErrorMessage('Não foi possível carregar a lista de vendedores.');
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const filtrados = vendedores.filter(
    (v) =>
      v.nome.toLowerCase().includes(search.toLowerCase().trim()) ||
      v.email.toLowerCase().includes(search.toLowerCase().trim())
  );

  const abrirModal = () => {
    setForm({ nome: '', email: '', senha: '', confirmarSenha: '' });
    setFormErros({});
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFormErros({});
  };

  const handleSubmitNovo = async () => {
    const erros = validarForm(form);
    if (Object.keys(erros).length > 0) {
      setFormErros(erros);
      return;
    }
    setSubmitting(true);
    setFormErros({});
    try {
      const payload: CriarVendedorRequest = {
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        senha: form.senha,
      };
      await criarVendedor(payload);
      setSuccessMessage('Vendedor cadastrado com sucesso. Ele já pode acessar o sistema com o e-mail e a senha definidos.');
      setSuccessModal(true);
      fecharModal();
      carregar();
    } catch (e) {
      setFormErros({ submit: e instanceof Error ? e.message : 'Erro ao cadastrar vendedor.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!confirmDelete) return;
    try {
      await excluirVendedor(confirmDelete.id);
      setSuccessMessage('Vendedor removido. O acesso dele foi revogado.');
      setSuccessModal(true);
      setConfirmDelete(null);
      carregar();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Erro ao excluir vendedor.');
      setErrorModal(true);
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <Navbar>
        <S.Container>
          <S.Header>
            <div>
              <S.Title>Vendedores</S.Title>
              <S.Subtitle>Gerencie os vendedores com acesso ao sistema.</S.Subtitle>
            </div>
            <S.HeaderActions>
              <S.SearchBar>
                <S.SearchIcon>
                  <Search size={20} />
                </S.SearchIcon>
                <S.SearchInput
                  type="text"
                  placeholder="Buscar por nome ou e-mail..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </S.SearchBar>
              <S.AddButton type="button" onClick={abrirModal}>
                <UserPlus size={20} />
                Adicionar vendedor
              </S.AddButton>
            </S.HeaderActions>
          </S.Header>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Carregando...</p>
          ) : filtrados.length === 0 ? (
            <S.EmptyState>
              <UserPlus size={48} />
              <h3>Nenhum vendedor encontrado</h3>
              <p>
                {search.trim()
                  ? 'Tente outro termo de busca.'
                  : 'Cadastre o primeiro vendedor para que ele possa acessar o sistema e registrar vendas.'}
              </p>
              {!search.trim() && (
                <S.AddButton type="button" onClick={abrirModal} style={{ marginTop: 16 }}>
                  <UserPlus size={20} />
                  Adicionar vendedor
                </S.AddButton>
              )}
            </S.EmptyState>
          ) : (
            <S.TableWrapper>
              <S.Table>
                <S.TableHeader>
                  <tr>
                    <S.TableHeaderCell>Vendedor</S.TableHeaderCell>
                    <S.TableHeaderCell>E-mail</S.TableHeaderCell>
                    <S.TableHeaderCell style={{ width: 120, textAlign: 'right' }}>Ações</S.TableHeaderCell>
                  </tr>
                </S.TableHeader>
                <tbody>
                  {filtrados.map((v) => (
                    <S.TableRow key={v.id}>
                      <S.TableCell>
                        <S.VendedorInfo>
                          <S.VendedorAvatar>{getIniciais(v.nome)}</S.VendedorAvatar>
                          <div>
                            <S.VendedorName>{v.nome}</S.VendedorName>
                            <S.VendedorEmail>{v.email}</S.VendedorEmail>
                          </div>
                        </S.VendedorInfo>
                      </S.TableCell>
                      <S.TableCell>{v.email}</S.TableCell>
                      <S.TableCell>
                        <S.ActionButtons style={{ justifyContent: 'flex-end' }}>
                          {user?.usuarioId !== v.id && (
                            <S.ActionButton
                              type="button"
                              title="Excluir vendedor"
                              onClick={() => setConfirmDelete({ id: v.id, nome: v.nome })}
                            >
                              <Trash2 size={18} />
                            </S.ActionButton>
                          )}
                        </S.ActionButtons>
                      </S.TableCell>
                    </S.TableRow>
                  ))}
                </tbody>
              </S.Table>
            </S.TableWrapper>
          )}
        </S.Container>
      </Navbar>

      {/* Modal Adicionar vendedor */}
      {modalAberto && (
        <S.Modal>
          <S.ModalOverlay onClick={fecharModal} />
          <S.ModalContent>
            <S.ModalHeader>
              <S.ModalTitle>Adicionar vendedor</S.ModalTitle>
              <S.ModalClose type="button" onClick={fecharModal}>
                <X size={24} />
              </S.ModalClose>
            </S.ModalHeader>
            <S.ModalBody>
              <S.FormGroup>
                <S.Label htmlFor="vendedor-nome">Nome completo</S.Label>
                <S.Input
                  id="vendedor-nome"
                  type="text"
                  placeholder="Ex.: Maria Silva"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                  $hasError={!!formErros.nome}
                />
                {formErros.nome && <S.FieldError>{formErros.nome}</S.FieldError>}
              </S.FormGroup>
              <S.FormGroup>
                <S.Label htmlFor="vendedor-email">E-mail (login)</S.Label>
                <S.Input
                  id="vendedor-email"
                  type="email"
                  placeholder="Ex.: maria@entrecapitulos.com.br"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  $hasError={!!formErros.email}
                />
                {formErros.email && <S.FieldError>{formErros.email}</S.FieldError>}
              </S.FormGroup>
              <S.FormGroup>
                <S.Label htmlFor="vendedor-senha">Senha</S.Label>
                <S.InputWrapper>
                  <S.Input
                    id="vendedor-senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={form.senha}
                    onChange={(e) => setForm((f) => ({ ...f, senha: e.target.value }))}
                    $hasError={!!formErros.senha}
                  />
                  <S.TogglePassword
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    disabled={submitting}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </S.TogglePassword>
                </S.InputWrapper>
                {formErros.senha && <S.FieldError>{formErros.senha}</S.FieldError>}
              </S.FormGroup>
              <S.FormGroup>
                <S.Label htmlFor="vendedor-confirmar">Confirmar senha</S.Label>
                <S.InputWrapper>
                  <S.Input
                    id="vendedor-confirmar"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repita a senha"
                    value={form.confirmarSenha}
                    onChange={(e) => setForm((f) => ({ ...f, confirmarSenha: e.target.value }))}
                    $hasError={!!formErros.confirmarSenha}
                  />
                  <S.TogglePassword
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    disabled={submitting}
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </S.TogglePassword>
                </S.InputWrapper>
                {formErros.confirmarSenha && <S.FieldError>{formErros.confirmarSenha}</S.FieldError>}
              </S.FormGroup>
              {formErros.submit && <S.FieldError style={{ marginBottom: 12 }}>{formErros.submit}</S.FieldError>}
            </S.ModalBody>
            <S.ModalFooter>
              <S.CancelButton type="button" onClick={fecharModal}>
                Cancelar
              </S.CancelButton>
              <S.SubmitButton type="button" onClick={handleSubmitNovo} disabled={submitting}>
                {submitting ? 'Cadastrando...' : 'Cadastrar vendedor'}
              </S.SubmitButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.Modal>
      )}

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Excluir vendedor"
        message={
          confirmDelete
            ? `Tem certeza que deseja remover "${confirmDelete.nome}"? O acesso dele ao sistema será revogado. As vendas já realizadas por ele permanecem no histórico, mas sem vendedor associado.`
            : ''
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleConfirmarExclusao}
        onCancel={() => setConfirmDelete(null)}
      />

      <SucessModal
        isOpen={successModal}
        title="Sucesso"
        message={successMessage}
        buttonText="OK"
        onClose={() => setSuccessModal(false)}
      />

      <ErrorModal
        isOpen={errorModal}
        title="Erro"
        message={errorMessage}
        onClose={() => setErrorModal(false)}
      />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import CancelModal from '@/components/modals/cancelModal';
import ConfirmModal from '@/components/modals/confirmModal';
import SucessModal from '@/components/modals/sucessModal';
import ErrorModal from '@/components/modals/errorModal';
import FormDropdown from '@/components/FormDropdown';
import { buscarLivro, atualizarLivro, excluirLivro, listarCategorias, type LivroDTO, type CategoriaDTO } from '@/services/api';
import {
  PageContainer,
  HomeBackground,
  HomeContent,
  HomeHeader,
  HomeTitle,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Select,
  ImageUpload,
  ImagePreview,
  ModalFooter,
  CancelButton,
  DeleteButton,
  SubmitButton,
  TwoColumnGrid
} from './styles';

export default function EditarComponent() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string, 10);

  const [livro, setLivro] = useState<LivroDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    author: '',
    price: 0,
    stock: 0,
    category: '',
    cover: ''
  });
  const [originalData, setOriginalData] = useState(formData);
  const [imagePreview, setImagePreview] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState<CategoriaDTO[]>([]);

  useEffect(() => {
    listarCategorias().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!bookId || isNaN(bookId)) {
      setLoading(false);
      return;
    }
    buscarLivro(bookId)
      .then((l) => {
        setLivro(l);
        const data = {
          id: l.id,
          title: l.titulo,
          author: l.autor,
          price: l.preco,
          stock: l.estoque,
          category: l.categoria,
          cover: l.imagemCapa || ''
        };
        setFormData(data);
        setOriginalData(data);
        setImagePreview(l.imagemCapa || '');
      })
      .catch(() => setLivro(null))
      .finally(() => setLoading(false));
  }, [bookId]);

  // Verificar se houve alterações
  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(changed);
  }, [formData, originalData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'stock'].includes(name) 
        ? Number(value) 
        : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, cover: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelClick = () => {
    if (hasChanges) {
      setShowCancelModal(true);
    } else {
      router.push('/home');
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push('/home');
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios!');
      setShowErrorModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    if (!livro) return;
    atualizarLivro(bookId, {
      titulo: formData.title,
      autor: formData.author,
      preco: formData.price,
      categoria: formData.category,
      estoque: formData.stock,
      imagemCapa: formData.cover || undefined
    })
      .then(() => setShowSuccessModal(true))
      .catch((err) => {
        setErrorMessage(err?.message || 'Erro ao atualizar livro.');
        setShowErrorModal(true);
      });
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/home');
  };

  const handleDeleteClick = () => setShowDeleteModal(true);

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (!livro) return;
    setIsDeleting(true);
    excluirLivro(bookId)
      .then(() => router.push('/home'))
      .catch((err) => {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setErrorMessage(err?.message || 'Erro ao excluir livro.');
        setShowErrorModal(true);
      });
  };

  const handleClose = () => {
    handleCancelClick();
  };

  if (loading) {
    return (
      <Navbar>
        <PageContainer>
          <HomeBackground>
            <HomeContent>
              <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Carregando livro...</p>
            </HomeContent>
          </HomeBackground>
        </PageContainer>
      </Navbar>
    );
  }

  if (!livro) {
    return (
      <Navbar>
        <PageContainer>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h1 style={{ marginBottom: '1rem' }}>Livro não encontrado</h1>
            <button
              type="button"
              onClick={() => router.push('/home')}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              Voltar para Home
            </button>
          </div>
        </PageContainer>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <PageContainer>
        <HomeBackground>
          <HomeContent>
            <HomeHeader>
              <HomeTitle>Editar Livro</HomeTitle>
            </HomeHeader>
          </HomeContent>
        </HomeBackground>

        <Modal>
          <ModalOverlay onClick={handleClose} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Editar Livro</ModalTitle>
              <ModalClose onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </ModalClose>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmitClick}>
                <FormGroup>
                  <Label>Título do Livro</Label>
                  <Input 
                    type="text"
                    name="title"
                    placeholder="Digite o título"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Autor</Label>
                  <Input 
                    type="text"
                    name="author"
                    placeholder="Digite o nome do autor"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Categoria</Label>
                  <FormDropdown
                    options={categories.map(cat => ({ value: cat.nome, label: cat.nome }))}
                    value={formData.category}
                    onChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
                    placeholder="Selecione uma categoria"
                  />
                </FormGroup>

                <TwoColumnGrid>
                  <FormGroup>
                    <Label>Preço (R$)</Label>
                    <Input 
                      type="number"
                      name="price"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Estoque</Label>
                    <Input 
                      type="number"
                      name="stock"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </TwoColumnGrid>

                <FormGroup>
                  <Label>Imagem da Capa</Label>
                  <ImageUpload>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                      {imagePreview ? (
                        <ImagePreview src={imagePreview} alt="Preview" />
                      ) : (
                        <>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span style={{ color: '#999', fontSize: '0.9rem' }}>Clique para adicionar imagem</span>
                        </>
                      )}
                    </label>
                  </ImageUpload>
                </FormGroup>

                <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                    <DeleteButton type="button" onClick={handleDeleteClick} disabled={isDeleting}>
                      Excluir livro
                    </DeleteButton>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <CancelButton type="button" onClick={handleCancelClick}>
                        Cancelar
                      </CancelButton>
                      <SubmitButton type="submit">
                        Salvar Alterações
                      </SubmitButton>
                    </div>
                  </div>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Modal de Cancelar Edição */}
        <CancelModal
          isOpen={showCancelModal}
          title="Cancelar Edição"
          message="Tem certeza que deseja cancelar? Todas as alterações serão perdidas."
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />

        {/* Modal de Confirmar Salvamento */}
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Confirmar Edição"
          message="Deseja realmente salvar as alterações deste livro?"
          confirmText="Salvar"
          cancelText="Cancelar"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirmModal(false)}
        />

        {/* Modal de Sucesso */}
        <SucessModal
          isOpen={showSuccessModal}
          title="Livro Editado!"
          message="As alterações do livro foram salvas com sucesso no sistema."
          buttonText="Continuar"
          onClose={handleSuccessClose}
        />

        {/* Modal de Confirmar Exclusão */}
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Excluir livro"
          message="Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita."
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />

        <ErrorModal
          isOpen={showErrorModal}
          title="Erro"
          message={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
      </PageContainer>
    </Navbar>
  );
}
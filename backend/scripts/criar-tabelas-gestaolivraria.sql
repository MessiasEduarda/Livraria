-- ============================================================
-- Script: criar todas as tabelas do projeto Gestão Livraria
-- Banco: gestaolivraria
-- Execute este script no pgAdmin conectado ao banco gestaolivraria
-- ============================================================

-- Conecte-se ao banco gestaolivraria antes de executar:
-- No pgAdmin: clique com botão direito em gestaolivraria -> Query Tool

-- ------------------------------------------------------------
-- 1. Tabela de usuários (login e vendedores)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    eh_vendedor BOOLEAN DEFAULT TRUE
);

-- ------------------------------------------------------------
-- 2. Tabela de papéis dos usuários (admin, user)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario_roles (
    usuario_id BIGINT NOT NULL,
    role VARCHAR(255),
    PRIMARY KEY (usuario_id, role),
    CONSTRAINT fk_usuario_roles_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 3. Tabela de clientes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    quantidade_compras INTEGER DEFAULT 0,
    total_gasto NUMERIC(12, 2) DEFAULT 0,
    data_cadastro DATE,
    categoria_preferida VARCHAR(255),
    endereco VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255),
    cep VARCHAR(10),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- ------------------------------------------------------------
-- 3.1 Tabela de categorias de livros (admin pode adicionar/remover)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- ------------------------------------------------------------
-- 4. Tabela de livros (estoque)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS livros (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    editora VARCHAR(255),
    ano INTEGER,
    paginas INTEGER,
    isbn VARCHAR(255) UNIQUE,
    preco NUMERIC(10, 2) NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0,
    categoria VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem_capa TEXT,
    idioma VARCHAR(255),
    edicao INTEGER DEFAULT 1
);

-- ------------------------------------------------------------
-- 5. Tabela de vendas
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vendas (
    id BIGSERIAL PRIMARY KEY,
    data_venda TIMESTAMP NOT NULL,
    cliente_id BIGINT NOT NULL,
    vendedor_id BIGINT,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    total NUMERIC(12, 2) NOT NULL,
    desconto NUMERIC(10, 2) DEFAULT 0,
    forma_pagamento VARCHAR(50),
    observacoes TEXT,
    CONSTRAINT fk_venda_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fk_venda_vendedor FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)
);

-- ------------------------------------------------------------
-- 6. Tabela de itens de cada venda
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS itens_venda (
    id BIGSERIAL PRIMARY KEY,
    venda_id BIGINT NOT NULL,
    livro_id BIGINT NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario NUMERIC(10, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,
    CONSTRAINT fk_item_venda FOREIGN KEY (venda_id) REFERENCES vendas(id) ON DELETE CASCADE,
    CONSTRAINT fk_item_livro FOREIGN KEY (livro_id) REFERENCES livros(id)
);

-- ------------------------------------------------------------
-- Índices (melhoram buscas e filtros)
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_clientes_nome ON clientes(nome);
CREATE INDEX IF NOT EXISTS idx_clientes_status ON clientes(status);
CREATE INDEX IF NOT EXISTS idx_livros_titulo ON livros(titulo);
CREATE INDEX IF NOT EXISTS idx_livros_categoria ON livros(categoria);
CREATE INDEX IF NOT EXISTS idx_vendas_data ON vendas(data_venda);
CREATE INDEX IF NOT EXISTS idx_vendas_cliente ON vendas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_vendas_vendedor ON vendas(vendedor_id);
CREATE INDEX IF NOT EXISTS idx_itens_venda_venda ON itens_venda(venda_id);

-- ============================================================
-- ------------------------------------------------------------
-- Para quem já criou as tabelas antes: alterar imagem_capa para TEXT
-- (evita erro "valor muito longo" ao editar livro com imagem em base64)
-- ------------------------------------------------------------
ALTER TABLE livros ALTER COLUMN imagem_capa TYPE TEXT;

-- Fim do script. Tabelas criadas.
-- Os usuários de login (admin, maria, henrique) são criados
-- automaticamente quando você RODA O BACKEND pela primeira vez.
--
-- Tela "Vendedores" (admin): usa apenas estas tabelas.
-- Não é necessário rodar nenhum script extra para essa funcionalidade.
-- ============================================================

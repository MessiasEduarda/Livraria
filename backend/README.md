# Backend - Gestão Livraria (Entre Capítulos)

API REST em **Java 17** e **Spring Boot 3.2** para o sistema de gestão de livraria, com persistência em **PostgreSQL**.

## Requisitos

- **JDK 17**
- **Maven 3.8+**
- **PostgreSQL 14+** (ou 15/16)

## Banco de dados PostgreSQL

### 1. Instalação

- **Windows:** instale pelo [site oficial](https://www.postgresql.org/download/windows/) ou use Chocolatey: `choco install postgresql`
- **macOS:** `brew install postgresql@14`
- **Linux:** `sudo apt install postgresql postgresql-contrib` (Ubuntu/Debian)

### 2. Criar banco e usuário

Abra o terminal do PostgreSQL (`psql`) ou o pgAdmin e execute:

```sql
-- Criar usuário (opcional; pode usar o usuário postgres)
CREATE USER gestaolivraria WITH PASSWORD 'sua_senha_aqui';

-- Criar banco de dados
CREATE DATABASE gestaolivraria OWNER gestaolivraria;

-- Conectar ao banco
\c gestaolivraria;

-- Permissões (se não for o owner)
GRANT ALL PRIVILEGES ON DATABASE gestaolivraria TO gestaolivraria;
```

Se preferir usar o usuário padrão `postgres`:

```sql
CREATE DATABASE gestaolivraria;
```

### 3. Configuração no projeto

Edite `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gestaolivraria
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA
```

Substitua `SUA_SENHA` pela senha do usuário PostgreSQL.

### 4. Tabelas

As tabelas são criadas automaticamente na primeira execução (`spring.jpa.hibernate.ddl-auto=update`):

- `usuarios` – usuários do sistema (login e vendedores)
- `usuario_roles` – papéis (roles)
- `clientes` – clientes da livraria
- `livros` – catálogo/estoque
- `vendas` – vendas
- `itens_venda` – itens de cada venda

### 5. Usuários iniciais

O sistema cria automaticamente estes usuários na primeira subida:

| Email                      | Senha       | Nome         |
|---------------------------|------------|--------------|
| admin@entrecapitulos.com.br | admin123   | Administrador |
| maria@entrecapitulos.com.br | maria123   | Maria         |
| henrique@entrecapitulos.com.br | henrique123 | Henrique   |

Use qualquer um para fazer login no frontend (após apontar o frontend para esta API).

## Executar o backend

```bash
cd backend
mvn spring-boot:run
```

A API ficará disponível em **http://localhost:8080**.

## Endpoints principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | `/api/auth/login` | Login (retorna JWT) |
| GET    | `/api/clientes` | Listar clientes (paginado) |
| GET    | `/api/clientes/{id}` | Buscar cliente |
| POST   | `/api/clientes` | Criar cliente |
| PUT    | `/api/clientes/{id}` | Atualizar cliente |
| DELETE | `/api/clientes/{id}` | Excluir cliente |
| GET    | `/api/livros` | Listar livros (paginado) |
| GET    | `/api/livros/todos` | Listar todos os livros (sem paginação) |
| GET    | `/api/livros/estoque-critico` | Livros com estoque baixo |
| GET    | `/api/livros/{id}` | Buscar livro |
| POST   | `/api/livros` | Criar livro |
| PUT    | `/api/livros/{id}` | Atualizar livro |
| DELETE | `/api/livros/{id}` | Excluir livro |
| GET    | `/api/vendas` | Listar vendas (paginado, com filtros) |
| GET    | `/api/vendas/{id}` | Buscar venda |
| POST   | `/api/vendas` | Registrar nova venda |
| POST   | `/api/vendas/{id}/cancelar` | Cancelar venda |
| GET    | `/api/dashboard` | Dados do dashboard |
| GET    | `/api/usuarios/vendedores` | Listar vendedores |

Todas as rotas (exceto `/api/auth/login`) exigem o header:

```
Authorization: Bearer <token>
```

## Integração com o frontend (Next.js)

No frontend, configure a base URL da API, por exemplo em `src/services/api.ts` ou em variável de ambiente:

- **Base URL:** `http://localhost:8080`
- **Login:** `POST http://localhost:8080/api/auth/login` com body `{ "email": "...", "senha": "..." }`
- Guarde o `token` da resposta e envie em todas as requisições: `Authorization: Bearer <token>`.

Exemplo de `.env.local` no frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Variáveis de ambiente (opcional)

Você pode sobrescrever configurações via variáveis de ambiente:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `APP_JWT_SECRET` – chave para assinar o JWT (produção: use valor longo e seguro)
- `APP_JWT_EXPIRATION_MS` – validade do token em milissegundos

## E-mail (opcional)

Para envio de recibos por e-mail, preencha em `application.properties`:

```properties
spring.mail.username=seu-email@gmail.com
spring.mail.password=senha-de-app
```

Para Gmail, use uma [Senha de app](https://support.google.com/accounts/answer/185833).

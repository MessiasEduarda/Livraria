# Passo a passo: PostgreSQL + pgAdmin para o projeto Gestão Livraria

Siga estes passos na ordem. No final, o backend sobe conectado ao banco e as tabelas são criadas automaticamente.

---

## Parte 1: No pgAdmin

### 1. Abrir o pgAdmin e conectar ao servidor

1. Abra o **pgAdmin**.
2. No painel esquerdo, clique em **Servers**.
3. Clique no seu servidor **PostgreSQL** (geralmente "PostgreSQL 14", "PostgreSQL 15" ou "PostgreSQL 16").
4. Digite a **senha do usuário postgres** (a que você definiu na instalação) e marque "Save password" se quiser.
5. Clique em **OK**. O servidor deve aparecer expandido.

---

### 2. Criar o banco de dados (se ainda não criou)

1. Com o servidor expandido, clique com o **botão direito** em **Databases**.
2. Escolha **Create** → **Database...**.
3. Na aba **General**:
   - **Database**: digite exatamente: `gestaolivraria`
   - **Owner**: deixe `postgres` (ou o usuário que você usa).
4. Clique em **Save**.

Pronto. O banco `gestaolivraria` deve aparecer em **Databases**.

---

### 3. Criar as tabelas (script SQL)

Se quiser criar as tabelas manualmente no pgAdmin (em vez de deixar o Spring Boot criar na primeira execução):

1. **Abra o Query Tool no banco gestaolivraria**  
   - Clique com o **botão direito** em **gestaolivraria** (não em DriveUp nem em postgres).  
   - Escolha **Query Tool**. A aba que abrir deve estar ligada ao banco **gestaolivraria** (veja o título da aba, ex.: `gestaolivraria/postgres@PostgreSQL 16`).

2. **Abra o script**  
   - No projeto, o script está em: **backend/scripts/criar-tabelas-gestaolivraria.sql**.  
   - Abra esse arquivo, copie todo o conteúdo e cole na Query Tool, **ou** use **File → Open** no pgAdmin e selecione o arquivo.

3. **Execute**  
   - Clique no ícone de **Executar** (▶) ou pressione **F5**.  
   - Verifique a aba **Messages**: deve aparecer que os comandos foram executados sem erro.

4. **Conferir**  
   - No painel esquerdo: **gestaolivraria** → **Schemas** → **public** → **Tables** → **Refresh**.  
   - Devem aparecer: **usuarios**, **usuario_roles**, **clientes**, **livros**, **vendas**, **itens_venda**.

**Importante:** Os usuários de login (admin, maria, henrique) **não** estão no script; eles são criados automaticamente quando você **roda o backend** pela primeira vez (DataInitializer).

---

### 4. (Opcional) Conferir a conexão

1. Clique em **gestaolivraria** para selecionar.
2. No menu superior: **Tools** → **Query Tool** (ou F5).
3. Digite: `SELECT current_database();`
4. Execute (ícone de play ou F5).
5. Deve aparecer uma linha com `gestaolivraria`. Se aparecer, o banco está ok.

Você pode fechar a Query Tool. As tabelas podem ser criadas pelo script (seção 3) ou pelo Spring Boot na primeira execução do backend.

---

## Parte 2: Configurar o backend (senha do PostgreSQL)

O projeto já está configurado para usar:

- **Host:** localhost  
- **Porta:** 5432  
- **Banco:** gestaolivraria  
- **Usuário:** postgres  

Só falta colocar a **senha** do usuário `postgres` no arquivo de configuração.

### Onde alterar

1. Abra a pasta do projeto no computador.
2. Vá em: **backend** → **src** → **main** → **resources**.
3. Abra o arquivo **application.properties** (com Bloco de notas, VS Code ou Cursor).

### O que alterar

Procure esta linha:

```properties
spring.datasource.password=sua_senha
```

Troque `sua_senha` pela **senha real** do usuário `postgres` no PostgreSQL.

Exemplo (só ilustrativo):

```properties
spring.datasource.password=MinhaSenha123
```

Salve o arquivo.

---

## Parte 3: Subir o backend

1. Abra um terminal (PowerShell ou CMD) na pasta **backend** do projeto:
   - Exemplo: `C:\Users\maria\OneDrive\Desktop\gestaolivraria\backend`
2. Execute:

```bash
mvn spring-boot:run
```

Se você usa **IDE** (IntelliJ, Eclipse, VS Code com extensão Java):

- Abra a pasta **backend** como projeto Maven/Java.
- Localize a classe **GestaoLivrariaApplication** (em `src/main/java/.../GestaoLivrariaApplication.java`).
- Clique com o botão direito nela e escolha **Run** (ou **Run 'GestaoLivrariaApplication'**).

### O que deve acontecer

- O Spring Boot sobe na porta **8080**.
- O Hibernate se conecta ao banco `gestaolivraria` e:
  - Cria as tabelas (usuarios, usuario_roles, clientes, livros, vendas, itens_venda) se ainda não existirem.
  - Atualiza o esquema se já existir (por causa do `spring.jpa.hibernate.ddl-auto=update`).
- O **DataInitializer** roda e cria 3 usuários para login (se ainda não existirem).

Se aparecer algo como “Started GestaoLivrariaApplication” e não der erro de conexão, o backend está funcionando com o banco.

---

## Parte 4: Conferir no pgAdmin (opcional)

1. No pgAdmin, clique com o botão direito em **gestaolivraria** → **Refresh**.
2. Expanda: **gestaolivraria** → **Schemas** → **public** → **Tables**.
3. Você deve ver tabelas como:
   - **usuarios**
   - **usuario_roles**
   - **clientes**
   - **livros**
   - **vendas**
   - **itens_venda**

Se essas tabelas existirem, o banco está configurado certinho para o projeto.

---

## Parte 5: Testar o login no frontend

1. Suba o **frontend** (por exemplo: na pasta **frontend**, execute `npm run dev`).
2. Acesse no navegador: **http://localhost:3000** (ou a porta que o Next.js mostrar).
3. Você deve ser redirecionado para a tela de login.
4. Use um dos usuários criados pelo DataInitializer:

| E-mail                      | Senha        | Perfil   |
|----------------------------|-------------|----------|
| admin@entrecapitulos.com.br | admin123    | Admin    |
| maria@entrecapitulos.com.br | maria123    | Vendedor |
| henrique@entrecapitulos.com.br | henrique123 | Vendedor |

Se o login abrir e levar para a área logada (home ou minhas vendas), o projeto está funcionando com o banco.

---

## Resumo rápido

| Onde              | O que fazer |
|-------------------|------------|
| **pgAdmin**       | Criar o banco com nome: `gestaolivraria`. |
| **application.properties** | Colocar a senha do usuário `postgres` em `spring.datasource.password=...`. |
| **Terminal/IDE**  | Rodar o backend (`mvn spring-boot:run` ou Run na classe `GestaoLivrariaApplication`). |
| **Frontend**      | Rodar o Next.js e testar o login. |

---

## Problemas comuns

### “Connection refused” ou “Could not connect to server”

- O **PostgreSQL** está instalado e rodando? (Serviço “postgresql-x64-14” ou similar no Windows.)
- A porta é **5432**? No pgAdmin, na conexão do servidor, veja a porta configurada e use a mesma no `application.properties` se tiver alterado.

### “FATAL: password authentication failed”

- A senha em **application.properties** está exatamente igual à senha do usuário `postgres` no PostgreSQL.
- No pgAdmin, teste conectar com o mesmo usuário e a mesma senha; se não conectar no pgAdmin, não vai conectar no backend.

### “Database gestaolivraria does not exist”

- O nome do banco no pgAdmin tem que ser exatamente: `gestaolivraria` (tudo minúsculo, sem espaço).

### Backend sobe mas não cria tabelas

- Confira se não há outro `application.properties` ou `application.yml` sobrescrevendo.
- Confira se o perfil ativo é o padrão (nenhum `-Dspring.profiles.active=...` que aponte para outra configuração).

Se seguir esse passo a passo, o projeto fica funcionando com o banco certinho: criar só o banco no pgAdmin, colocar a senha no `application.properties` e rodar o backend.

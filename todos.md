# Tarefas de Implementação

## 1. Implementar Autenticação

### Backend
1. **Instalar dependências**:
   - `bcryptjs`: Para hashing de senhas.
   - `jsonwebtoken`: Para criar e verificar tokens JWT.

2. **Atualizar `userRoutes.js`**:
   - Criar rota para **login**:
     - Receber nome de usuário e senha.
     - Verificar usuário e senha no banco de dados.
     - Gerar um token JWT e retorná-lo para o cliente.

3. **Configurar variável de ambiente**:
   - Definir a variável `JWT_SECRET` para assinatura dos tokens.

4. **Proteger rotas**:
   - Adicionar middleware para verificar o token JWT em rotas que requerem autenticação.

### Frontend
1. **Atualizar `LoginForm.jsx`**:
   - Enviar o nome de usuário e senha para a nova rota de login.
   - Armazenar o token JWT em localStorage ou cookies.

2. **Atualizar navegação**:
   - Exibir informações do usuário autenticado e adicionar funcionalidade para logout.

## 2. Migrar de MySQL para SQLite

### Backend
1. **Instalar dependências**:
   - `sqlite3`: Biblioteca para interagir com SQLite.

2. **Criar `db.js`**:
   - Configurar a conexão com o banco de dados SQLite.

3. **Criar script de inicialização (`initDb.js`)**:
   - Criar as tabelas `users` e `products` no banco de dados SQLite.

4. **Atualizar `userRoutes.js` e `productRoutes.js`**:
   - Alterar consultas SQL para usar SQLite.
   - Atualizar rotas para realizar operações CRUD usando SQLite.

### Frontend
1. **Verificar URLs das APIs**:
   - Garantir que o frontend está se comunicando com as rotas corretas no backend.

2. **Testar funcionalidades**:
   - Testar o envio e recebimento de dados para garantir que tudo funciona com o novo banco de dados.

## Notas
- Verificar a configuração de variáveis de ambiente e credenciais.
- Testar extensivamente após implementar as alterações para garantir que não haja problemas na transição.


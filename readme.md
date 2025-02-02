# Gerenciador de Jogos

O Gerenciador de Jogos é uma aplicação web full-stack para gerenciar produtos de jogos e usuários. Possui um frontend em React com TypeScript, backend em Express.js e banco de dados SQLite.

## Funcionalidades

- Gerenciamento de usuários (registro e visualização)
- Gerenciamento de produtos (operações CRUD)
- Visualização de tabelas do banco de dados
- Exportação de dados em CSV
- Design responsivo com Tailwind CSS
- Hash seguro de senhas com bcrypt

## Stack Tecnológica

- Frontend:

  - React com TypeScript
  - Tailwind CSS
  - Axios
  - React Router DOM
  - Headless UI

- Backend:
  - Node.js
  - Express.js
  - SQLite3
  - Bcrypt
  - CORS

## Estrutura do Projeto

```
game-manager/
├── client/           # Aplicação React Frontend
├── server/           # Aplicação Express Backend
└── admin/            # Painel Administrativo
```

## Começando

1. Clone o repositório
2. Instale as dependências:

```bash
# Instalar dependências do servidor
cd server
npm install

# Instalar dependências do cliente
cd ../client
npm install
```

3. Inicie o servidor:

```bash
cd server
npm run server
```

4. Inicie o cliente:

```bash
cd client
npm run dev
```

5. Acesse a aplicação em `http://localhost:3000`

## Endpoints da API

### Usuários

- `POST /user/login` - Login de usuário
- `POST /user/register` - Registro de usuário
- `GET /user/data` - Obter todos os usuários
- `DELETE /user/delete/:id` - Deletar usuário

### Produtos

- `POST /product` - Criar produto
- `PUT /product/update/:id` - Atualizar produto
- `GET /product/data` - Obter todos os produtos
- `DELETE /product/delete` - Deletar todos os produtos
- `DELETE /product/delete/:id` - Deletar produto específico
- `GET /product/save` - Exportar produtos para CSV

## Licença

MIT

# Game Manager

Este é um projeto de gerenciamento de produtos e usuários, desenvolvido utilizando React no frontend e Node.js com Express no backend. O banco de dados utilizado é o SQLite3.

## Estrutura do Projeto

### Frontend

O frontend foi desenvolvido utilizando React e Tailwind CSS para a estilização. A estrutura de pastas é a seguinte:

- `src/components`: Contém os componentes reutilizáveis da aplicação.
- `src/pages`: Contém as páginas principais da aplicação.
- `src/styles`: Contém os arquivos de estilo.
- `public`: Contém arquivos públicos como `index.html` e `manifest.json`.

### Backend

O backend foi desenvolvido utilizando Node.js com Express. A estrutura de pastas é a seguinte:

- `routes`: Contém as rotas da API.
- `db.js`: Configuração da conexão com o banco de dados MySQL.
- `index.js`: Arquivo principal do servidor.

## Funcionalidades

### Frontend

- **Login**: Página de login para autenticação de usuários.
- **Home**: Página inicial da aplicação.
- **Produtos**: Página para adicionar novos produtos.
- **Estoque**: Página para visualizar e editar produtos no estoque.
- **Perfil**: Página de perfil do usuário.
- **Configurações**: Página de configurações do usuário.

### Backend

- **Autenticação**: Rotas para login e registro de usuários.
- **Produtos**: Rotas para CRUD de produtos.
- **Usuários**: Rotas para CRUD de usuários.

## Instalação

### Pré-requisitos

- Node.js
- MySQL

### Passos

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Configure o banco de dados MySQL com as credenciais no arquivo `.env`:
    ```env
    PORT="Sua porta desejada"
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD="Sua senha"
    DB_NAME="Nome do seu banco de dados"
    ```

3. Instale as dependências do backend:
    ```sh
    cd backend
    npm install
    ```

4. Inicie o servidor backend:
    ```sh
    npm run server
    ```

5. Instale as dependências do frontend:
    ```sh
    cd ../frontend
    npm install
    ```

6. Inicie o servidor frontend:
    ```sh
    npm start
    ```

## Uso

1. Acesse a aplicação no navegador:
    ```
    http://localhost:3000
    ```

2. Utilize as funcionalidades de login, gerenciamento de produtos e usuários conforme necessário.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch:
    ```sh
    git checkout -b minha-feature
    ```
3. Faça suas alterações e commit:
    ```sh
    git commit -m 'Minha nova feature'
    ```
4. Envie para o repositório remoto:
    ```sh
    git push origin minha-feature
    ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Nome: Rafael Raniere de Oliveira
- Email: seu-email@example.com

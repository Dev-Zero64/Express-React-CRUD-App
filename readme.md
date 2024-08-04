# Express / React - CRUD App

O Game Manager é uma aplicação CRUD desenvolvida com Node.js, Express, React, MySQL e Tailwind CSS. O objetivo do projeto é gerenciar produtos e usuários em um sistema de gerenciamento de estoque e dados de jogo.

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express
  - MySQL (ou SQLite, dependendo da configuração)

- **Outras**:
  - Axios para requisições HTTP
  - Bcryptjs para hashing de senhas
  - Jsonwebtoken para autenticação

## Funcionalidades

- **Cadastro e Login de Usuários**: Permite que os usuários se registrem e façam login.
- **Gestão de Produtos**:
  - Adicionar, editar e remover produtos.
  - Filtrar produtos por nome.
  - Exibir produtos em uma tabela.
  - Baixar os dados dos produtos em formato CSV.
- **Páginas**:
  - Home Page
  - Página de Produtos
  - Página de Estoque
  - Página de Perfil
  - Página de Configurações

## Configuração do Projeto

### Pré-requisitos

- Node.js
- MySQL ou SQLite (dependendo da configuração)

### Backend

1. **Instalação das Dependências**:
   Navegue até o diretório do backend e instale as dependências:
   ```bash
   cd backend
   npm install

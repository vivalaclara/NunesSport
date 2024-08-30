# NUNES-SPORT Product Management System

Este é um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de produtos vendidos pela NUNES-SPORT. A aplicação é composta por um backend desenvolvido em Java 17 com Spring Boot e um frontend desenvolvido em React com TypeScript. Este README fornece instruções detalhadas sobre como configurar, instalar e executar o projeto em diferentes sistemas operacionais.

## Sumário

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação](#instalação)
    - [Windows](#windows)
    - [Linux](#linux)
    - [macOS](#macos)
4. [Executando o Projeto](#executando-o-projeto)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Entidade `Produto`](#entidade-produto)
7. [Rotas da API](#rotas-da-api)
8. [Collection do Postman](#collection-do-postman)
9. [Considerações Finais](#considerações-finais)

## Visão Geral do Projeto

O sistema foi desenvolvido para gerenciar os produtos vendidos pela companhia, permitindo exibir, criar, editar e deletar produtos. O backend fornece uma API RESTful enquanto o frontend fornece uma interface amigável para interação com os dados.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas na sua máquina:

- **Java 17**: Para executar o backend.
- **Maven**: Para gerenciar as dependências do backend.
- **Node.js 20** e **npm**: Para executar o frontend.
- **Git**: Para clonar o repositório.

## Instalação

### Windows

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/vivalaclara/NunesSport
   cd NunesSport
   ```

2. **Backend:**
   - Navegue para o diretório `product-crud`:
     ```sh
     cd product-crud
     ```
   - Compile e instale as dependências:
     ```sh
     mvn clean install
     ```

3. **Frontend:**
   - Navegue para o diretório `product-frontend`:
     ```sh
     cd ../product-frontend
     ```
   - Instale as dependências:
     ```sh
     npm install
     ```

### Linux

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/vivalaclara/NunesSport
   cd NunesSport
   ```

2. **Backend:**
   - Navegue para o diretório `product-crud`:
     ```sh
     cd product-crud
     ```
   - Compile e instale as dependências:
     ```sh
     ./mvnw clean install
     ```

3. **Frontend:**
   - Navegue para o diretório `product-frontend`:
     ```sh
     cd ../product-frontend
     ```
   - Instale as dependências:
     ```sh
     npm install
     ```

### macOS

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/vivalaclara/NunesSport
   cd NunesSport
   ```

2. **Backend:**
   - Navegue para o diretório `product-crud`:
     ```sh
     cd product-crud
     ```
   - Compile e instale as dependências:
     ```sh
     ./mvnw clean install
     ```

3. **Frontend:**
   - Navegue para o diretório `product-frontend`:
     ```sh
     cd ../product-frontend
     ```
   - Instale as dependências:
     ```sh
     npm install
     ```

## Executando o Projeto

### Backend

Para iniciar o backend, navegue até o diretório `product-crud` e execute o seguinte comando:

```sh
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`.

### Frontend

Para iniciar o frontend, navegue até o diretório `product-frontend` e execute o seguinte comando:

```sh
npm start
```

O frontend estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```plaintext
NUNES-SPORT/
│
├── product-crud/           # Backend (Java, Spring Boot)
│   ├── src/                # Código fonte do backend
│   ├── pom.xml             # Arquivo de configuração do Maven
│   └── ...                 # Outros arquivos de configuração do backend
│
├── product-frontend/       # Frontend (React, TypeScript)
│   ├── src/                # Código fonte do frontend
│   ├── package.json        # Arquivo de configuração do npm
│   └── ...                 # Outros arquivos de configuração do frontend
│
├── collection/             # Postman Collection
│   └── Product_CRUD_API.postman_collection.json
│
└── README.md               # Documentação do projeto
```

## Entidade `Produto`

A entidade `Produto` representa os produtos vendidos pela companhia e possui os seguintes atributos:

- **id** (Long): Identificador único do produto.
- **nome** (String): Nome do produto, deve ter entre 1 e 255 caracteres.
- **codigo** (String): Código único do produto.
- **descricao** (String): Descrição detalhada do produto.
- **preco** (Float): Preço do produto, deve ser maior que zero.

## Rotas da API

### `GET /products`

Retorna uma lista de todos os produtos.

- **Exemplo de resposta:**
  ```json
  [
    {
      "id": 1,
      "nome": "Produto A",
      "codigo": "123ABC",
      "descricao": "Descrição do Produto A",
      "preco": 100.0
    },
    ...
  ]
  ```

### `GET /products/{id}`

Retorna um produto específico pelo ID.

- **Parâmetros:**
  - `id` (Long): ID do produto.

- **Exemplo de resposta:**
  ```json
  {
    "id": 1,
    "nome": "Produto A",
    "codigo": "123ABC",
    "descricao": "Descrição do Produto A",
    "preco": 100.0
  }
  ```

### `GET /products/codigo/{codigo}`

Retorna um produto específico pelo código.

- **Parâmetros:**
  - `codigo` (String): Código do produto.

- **Exemplo de resposta:**
  ```json
  {
    "id": 1,
    "nome": "Produto A",
    "codigo": "123ABC",
    "descricao": "Descrição do Produto A",
    "preco": 100.0
  }
  ```

### `POST /products`

Cria um novo produto.

- **Corpo da requisição:**
  ```json
  {
    "nome": "Novo Produto",
    "codigo": "NEWCODE",
    "descricao": "Descrição do novo produto",
    "preco": 99.99
  }
  ```

- **Exemplo de resposta:**
  ```json
  {
    "id": 2,
    "nome": "Novo Produto",
    "codigo": "NEWCODE",
    "descricao": "Descrição do novo produto",
    "preco": 99.99
  }
  ```

### `PUT /products/{id}`

Atualiza um produto existente.

- **Parâmetros:**
  - `id` (Long): ID do produto.

- **Corpo da requisição:**
  ```json
  {
    "nome": "Produto Atualizado",
    "codigo": "UPDATECODE",
    "descricao": "Descrição atualizada",
    "preco": 149.99
  }
  ```

- **Exemplo de resposta:**
  ```json
  {
    "id": 1,
    "nome": "Produto Atualizado",
    "codigo": "UPDATECODE",
    "descricao": "Descrição atualizada",
    "preco": 149.99
  }
  ```

### `DELETE /products/{id}`

Deleta um produto existente.

- **Parâmetros:**
  - `id` (Long): ID do produto.

- **Exemplo de resposta:** `204 No Content`

## Collection do Postman

Dentro da pasta `collection` na raiz do projeto, há um arquivo chamado `Product_CRUD_API.postman_collection.json`. Esse arquivo contém uma coleção de todas as rotas da API, que pode ser importada diretamente no Postman para facilitar o teste das funcionalidades da API.

### Como importar a collection:

1. Abra o Postman.
2. Vá em **File** > **Import**.
3. Selecione o arquivo `Product_CRUD_API.postman_collection.json` na pasta `collection`.
4. Após a importação, você verá todas as rotas disponíveis para teste

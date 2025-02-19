# LeadAPI

API para gestão de Leads, Campanhas e Grupos

## Descrição

O LeadAPI é uma API construída com Node.js, Express e TypeScript, desenvolvida para gerenciar leads, campanhas e grupos. A aplicação utiliza o Prisma como ORM para interagir com um banco de dados PostgreSQL, facilitando operações CRUD (criação, leitura, atualização e deleção) para os principais recursos, bem como o gerenciamento das associações entre eles.

## Funcionalidades

- **Leads:** Criação, listagem, atualização, deleção e visualização de detalhes.
- **Grupos:** Gerenciamento de grupos de leads.
- **Campanhas:** Criação, listagem, atualização, deleção e gerenciamento de campanhas.
- **Associação de Leads:** Adição e remoção de leads em campanhas e grupos.
- **Endpoint de Status:** Verificação rápida do status da API.

## Tecnologias Utilizadas

- **Node.js & Express:** Servidor web e gerenciamento de rotas.
- **TypeScript:** Adição de tipagem estática para maior robustez e escalabilidade.
- **Prisma:** ORM para modelagem e acesso ao banco de dados PostgreSQL.
- **PostgreSQL:** Banco de dados relacional.
- **Zod:** Validação de dados.
- **Cors:** Configuração de Cross-Origin Resource Sharing para segurança e integração.

## Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn
- PostgreSQL instalado e configurado
- (Opcional) Prisma CLI para executar migrações

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Dionisio-DM/LeadAPI.git
   cd LeadAPI
   ```
2. **Instale as dependências:**
  ```bash
  npm install
  ```
3. **Configure as variáveis de ambiente (Crie um arquivo .env na raiz do projeto e defina a variável DATABASE_URL com a string de conexão do seu banco de dados PostgreSQL):**

  ```bash
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
  ```

4. **Execute as migrações do Prisma (se aplicável):**

  ```bash
  npx prisma migrate dev --name init
  ```

## Uso

### Modo de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento, utilize:

~~~bash
npm run dev
~~~

O servidor será iniciado em [http://localhost:3000](http://localhost:3000) (ou na porta definida na variável de ambiente `PORT`).

### Build e Produção

Compile o projeto:

~~~bash
npm run build
~~~

Inicie o servidor compilado:

~~~bash
npm start
~~~

## Endpoints da API

Os principais endpoints da API são agrupados conforme o recurso:

### Leads

- **GET** `/api/leads`  
  Listar todos os leads.

- **POST** `/api/leads`  
  Criar um novo lead.

- **GET** `/api/leads/:id`  
  Obter os detalhes de um lead específico.

- **PUT** `/api/leads/:id`  
  Atualizar as informações de um lead.

- **DELETE** `/api/leads/:id`  
  Remover um lead.

### Grupos

- **GET** `/api/groups`  
  Listar todos os grupos.

- **POST** `/api/groups`  
  Criar um novo grupo.

- **GET** `/api/groups/:id`  
  Obter os detalhes de um grupo específico.

- **PUT** `/api/groups/:id`  
  Atualizar as informações de um grupo.

- **DELETE** `/api/groups/:id`  
  Remover um grupo.

- **GET** `/api/groups/:groupId/leads`  
  Listar os leads associados a um grupo.

- **POST** `/api/groups/:groupId/leads`  
  Adicionar um lead a um grupo.

- **DELETE** `/api/groups/:groupId/leads/:leadId`  
  Remover um lead de um grupo.

### Campanhas

- **GET** `/api/campaigns`  
  Listar todas as campanhas.

- **POST** `/api/campaigns`  
  Criar uma nova campanha.

- **GET** `/api/campaigns/:id`  
  Obter os detalhes de uma campanha específica.

- **PUT** `/api/campaigns/:id`  
  Atualizar as informações de uma campanha.

- **DELETE** `/api/campaigns/:id`  
  Remover uma campanha.

- **GET** `/api/campaigns/:campaignId/leads`  
  Listar os leads associados a uma campanha.

- **POST** `/api/campaigns/:campaignId/leads`  
  Adicionar um lead a uma campanha.

- **PUT** `/api/campaigns/:campaignId/leads/:leadId`  
  Atualizar o status de um lead dentro de uma campanha.

- **DELETE** `/api/campaigns/:campaignId/leads/:leadId`  
  Remover um lead de uma campanha.

### Status

- **GET** `/api/status`  
  Endpoint para verificar se a API está operando corretamente. Retorna:

~~~json
{ "message": "OK" }
~~~

## Modelos de Dados (Prisma)

A seguir, uma visão geral dos modelos definidos no arquivo `prisma/schema.prisma`:

### Lead

- **id:** Identificador único (autoincremental).
- **name:** Nome do lead.
- **email:** Email único do lead.
- **phone:** Número de telefone.
- **status:** Status do lead (enum: New, Contacted, Qualified, Converted, Unresponsive, Disqualified, Archived).
- **createdAt:** Data de criação.
- **updatedAt:** Data de atualização.
- **Relacionamentos:**  
  Associado a múltiplos grupos e campanhas.

### Group

- **id:** Identificador único (autoincremental).
- **name:** Nome do grupo.
- **description:** Descrição do grupo.
- **Relacionamentos:**  
  Pode conter diversos leads.

### Campaign

- **id:** Identificador único (autoincremental).
- **name:** Nome da campanha.
- **description:** Descrição da campanha.
- **startDate:** Data de início.
- **endDate:** Data de término (opcional).
- **Relacionamentos:**  
  Conecta leads através da tabela intermediária `LeadCampaign`.

### LeadCampaign

- **leadId & campaignId:** Chave primária composta que representa a associação entre um lead e uma campanha.
- **status:** Status da associação (enum com valores como New, Engaged, Followup_schedule, Contacted, Qualified, Disqualified, Converted, Unresponsive, Re_Engaged, Opted_out).


## Licença

[MIT](https://choosealicense.com/licenses/mit/)

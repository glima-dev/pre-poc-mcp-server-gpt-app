# LM Rental Pre-POC

## Visão geral

Este repositório concentra a **pré-POC / POC funcional** do app de ofertas de assinatura Volkswagen para uso no ChatGPT, construída com:

- **MCP Server** em TypeScript
- **Apps SDK** para integração com o ChatGPT
- **Widget React** renderizado inline no chat
- **Filtros server-side** sobre uma base mockada de ofertas

O objetivo deste projeto é validar, de ponta a ponta, a experiência de:

1. expor uma tool no ChatGPT via MCP
2. processar filtros no servidor
3. renderizar ofertas em cards no widget
4. abrir detalhes da oferta dentro do próprio app inline

---

## Objetivo desta POC

Esta POC existe para comprovar a viabilidade técnica e a experiência base do produto.

### O que está coberto

- servidor MCP funcional
- widget React inline no ChatGPT
- lista de ofertas em carrossel
- filtros processados no servidor
- detalhe da oferta dentro do widget
- empty state tratado
- identidade visual adaptada ao contexto do ChatGPT

### O que está fora de escopo

Os itens abaixo **não fazem parte desta POC** e ficam reservados para a etapa de produto final:

- geração de candidatos para refinamento posterior pelo GPT
- refino em múltiplas etapas com o modelo
- integração com backend real
- fluxo real de contratação
- telemetria e observabilidade de produção
- uso oficial de superfícies avançadas do host, como fullscreen/modal, como parte mandatória da entrega

---

## Estrutura do repositório

```text
lm-rental-pre-poc/
├─ server/
│  ├─ src/
│  │  ├─ data/
│  │  ├─ lib/
│  │  └─ index.ts
│  ├─ package.json
│  └─ tsconfig.json
├─ web/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ data/
│  │  ├─ hooks/
│  │  └─ stylesheets/
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ tsconfig.webpack.json
│  └─ webpack.config.ts
└─ README.md
```

### Responsabilidades por diretório

#### `server/`
Contém o servidor MCP responsável por:

- registrar tools
- registrar o template/UI resource
- aplicar filtros nas ofertas
- devolver `content` e `structuredContent` ao ChatGPT

#### `web/`
Contém o widget React responsável por:

- renderizar lista, cards e detalhe
- consumir o resultado da tool
- exibir a interface inline dentro do ChatGPT

---

## Pré-requisitos

Antes de começar, garanta que a máquina tenha:

- **Node.js** instalado
- **Yarn** instalado
- **ngrok** instalado e autenticado

Também é necessário ter acesso a uma conta do ChatGPT com possibilidade de uso do modo de desenvolvimento para apps/conectores.

---

## Instalação

A instalação é feita separadamente em `web/` e `server/`.

### Instalar dependências do widget

```bash
cd web
yarn install
```

### Instalar dependências do servidor MCP

```bash
cd ../server
yarn install
```

---

## Como rodar o projeto localmente

O fluxo local usa **múltiplos terminais**.

### Terminal 1: gerar o bundle do widget

No diretório `web/`:

```bash
cd web
yarn build
```

Esse comando gera o bundle em `web/dist/`.

> Importante: o servidor MCP embute esse bundle na UI resource. Sempre que houver mudança no front-end, é necessário rebuildar o widget.

### Terminal 2: subir o servidor MCP

No diretório `server/`:

```bash
cd server
yarn dev
```

Se tudo estiver correto, o servidor ficará disponível em:

```text
http://localhost:2091/mcp
```

### Terminal 3: abrir o MCP Inspector

Com o servidor rodando, execute:

```bash
npx @modelcontextprotocol/inspector@latest --server-url http://localhost:2091/mcp --transport http
```

O Inspector é útil para:

- validar se a tool foi registrada
- testar chamadas sem depender do ChatGPT
- inspecionar o `structuredContent` retornado pelo servidor

---

## Como expor o servidor com ngrok

Para que o ChatGPT consiga alcançar o servidor local, é necessário expor a porta do MCP via HTTPS.

### Autenticar o ngrok

Caso o ngrok ainda não esteja autenticado nesta máquina:

```bash
ngrok config add-authtoken SEU_TOKEN
```

### Subir o túnel

Com o servidor MCP já rodando na porta `2091`:

```bash
ngrok http 2091
```

O ngrok vai gerar uma URL pública, por exemplo:

```text
https://seu-subdominio.ngrok.app
```

A URL a ser usada no ChatGPT será:

```text
https://seu-subdominio.ngrok.app/mcp
```

---

## Como testar o app no ChatGPT

### 1. Ativar o modo de desenvolvimento

No ChatGPT web:

1. acesse **Settings**
2. entre em **Apps & Connectors**
3. abra **Advanced settings**
4. ative **Developer mode**

### 2. Criar o connector

Depois de habilitar o modo de desenvolvimento:

1. vá em **Settings → Connectors**
2. clique em **Create**
3. preencha os dados do conector

Sugestão de preenchimento:

- **Connector name**: `LM Rental Pre-POC`
- **Description**: `Exibe ofertas mockadas de assinatura Volkswagen em cards dentro do ChatGPT.`
- **Connector URL**: `https://seu-subdominio.ngrok.app/mcp`

Se a conexão estiver correta, o ChatGPT reconhecerá as tools publicadas pelo servidor.

### 3. Usar o app em uma conversa

Após criar o connector:

1. abra um novo chat
2. clique no botão **+** próximo à caixa de mensagem
3. entre em **More**
4. selecione o connector criado
5. envie um prompt relacionado às ofertas

Exemplos:

- `me mostre ofertas do polo`
- `quero ofertas em até 30 dias`
- `quero um suv preto`
- `quero ver detalhes da oferta do tera`

---

## Fluxo recomendado de desenvolvimento

Sempre que houver alteração no front-end ou no servidor, siga este ciclo:

### 1. Rebuild do widget

```bash
cd web
yarn build
```

### 2. Reinício do servidor MCP

```bash
cd ../server
yarn dev
```

### 3. Garantir que o ngrok continua ativo

Se o túnel caiu, subir novamente:

```bash
ngrok http 2091
```

### 4. Atualizar o connector no ChatGPT

No ChatGPT:

1. vá em **Settings → Connectors**
2. abra o connector do projeto
3. clique em **Refresh**

> Em desenvolvimento local, esse ciclo de **build → restart → refresh** deve ser tratado como rotina padrão.

---

## Fluxo mínimo para alguém rodar este projeto do zero

Para facilitar o onboarding, abaixo está o passo a passo mínimo e completo:

### Passo 1
Clonar o repositório.

### Passo 2
Instalar dependências de `web/` e `server/`.

### Passo 3
Rodar `yarn build` em `web/`.

### Passo 4
Rodar `yarn dev` em `server/`.

### Passo 5
Validar o servidor no Inspector.

### Passo 6
Subir `ngrok http 2091`.

### Passo 7
Copiar a URL pública com `/mcp`.

### Passo 8
Criar o connector no ChatGPT em modo developer.

### Passo 9
Abrir um novo chat e testar os prompts.

---

## Troubleshooting

### O ChatGPT não encontra as tools

Verificar:

- se o servidor MCP está rodando
- se a URL configurada termina com `/mcp`
- se o ngrok continua ativo
- se o connector foi criado com a URL mais recente do túnel

### O texto volta, mas o widget não aparece

Verificar:

- se o `web/dist/` foi rebuildado
- se o servidor foi reiniciado após o build
- se o connector foi atualizado no ChatGPT
- se o bundle está sendo lido corretamente pelo `server/src/index.ts`

### O layout parece desatualizado

Verificar:

- se o último `yarn build` do `web/` foi executado
- se o servidor MCP foi reiniciado depois do build
- se o connector foi atualizado manualmente no ChatGPT

### O Inspector funciona, mas o ChatGPT não conecta

Verificar:

- se a URL usada no ChatGPT é a do ngrok, não a local
- se a URL pública inclui `/mcp`
- se o túnel continua ativo e apontando para a porta `2091`

---

## Observações importantes

### Sobre o modo inline

Nesta POC, o app foi desenhado para trabalhar **inline dentro do widget do ChatGPT**.

Isso significa que:

- o layout precisa respeitar o espaço do iframe
- a experiência mobile exige atenção especial a altura e rolagem
- o detalhe da oferta foi tratado como navegação interna do widget, e não como superfície fullscreen do host

### Sobre filtros

Nesta POC, os filtros são processados integralmente no servidor.

Isso foi uma decisão intencional para manter o comportamento previsível e facilitar a validação técnica da experiência.

### Sobre a etapa futura de produto

A etapa de:

- geração de candidatos
- refinamento posterior pelo GPT
- ranking mais sofisticado

fica reservada para a evolução do produto final, e **não faz parte do escopo atual desta POC**.

---

## Referências úteis

### OpenAI Apps SDK
- Quickstart: https://developers.openai.com/apps-sdk/quickstart
- Build your MCP server: https://developers.openai.com/apps-sdk/build/mcp-server
- Build your ChatGPT UI: https://developers.openai.com/apps-sdk/build/chatgpt-ui
- Reference: https://developers.openai.com/apps-sdk/reference

### MCP Inspector
- https://github.com/modelcontextprotocol/inspector

### ngrok
- https://ngrok.com/docs

---

## Contato / contexto do projeto

Este repositório deve ser tratado como artefato de validação técnica.

Em caso de evolução para produto final, recomenda-se abrir uma nova frente para:

- definição do fluxo de candidatos + refinamento pelo GPT
- integração com backend real
- definição de métricas de uso
- endurecimento técnico para produção

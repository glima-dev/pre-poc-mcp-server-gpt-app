# LM Rental Pre-POC

## Visão geral

Este repositório concentra a **pré-POC / POC funcional** do app de ofertas de assinatura Volkswagen para uso no ChatGPT, construída com:

- **MCP Server** em TypeScript
- **Apps SDK** para integração com o ChatGPT
- **Widget React** para renderização da UI
- **Filtros server-side** sobre um catálogo mockado de ofertas
- **Preparação de integração com API GTI V2** no backend

O objetivo deste projeto é validar, de ponta a ponta, a experiência de:

1. expor tools no ChatGPT via MCP
2. processar filtros no servidor
3. renderizar ofertas em cards dentro do widget
4. abrir o detalhe da oferta em fullscreen do host
5. manter uma experiência visual coerente com o contexto do ChatGPT
6. preparar o backend para a futura troca do mock pela API real

---

## Objetivo desta POC

Esta POC existe para comprovar a viabilidade técnica e a experiência base do produto.

### O que está coberto

- servidor MCP funcional
- widget React integrado ao ChatGPT
- carrossel de ofertas inline no chat
- filtros processados no servidor sobre catálogo mockado
- abertura de detalhe em **fullscreen do host**
- persistência do estado visual do widget via `widgetState`
- tratamento de `displayMode` (`inline` e `fullscreen`)
- tratamento de `safeArea` para mobile fullscreen
- tema visual preparado para **dark** e **light**
- navegação do carrossel com:
  - **setas no desktop**
  - **dots no mobile**
- renderização visual apenas quando faz sentido mostrar a vitrine
- estrutura inicial para integração com **GTI V2** no servidor

### O que está fora de escopo

Os itens abaixo **não fazem parte desta POC** e ficam reservados para a etapa de produto final:

- geração de candidatos para refinamento posterior pelo GPT
- refino em múltiplas etapas com o modelo
- fluxo real de contratação
- telemetria e observabilidade de produção
- endurecimento de segurança e operação para ambiente produtivo
- remoção definitiva do mock em favor da API real
- ranking avançado, personalização e regras finais de negócio

> Neste momento, o catálogo exibido pela UI ainda é **mockado**. A integração com a API real está sendo preparada em paralelo no server, mas a API ainda **não** é a fonte oficial da vitrine.

---

## Evolução da POC

### Fase inicial

A primeira fase validou o caminho mínimo:

- tool MCP retornando `structuredContent`
- widget React renderizando cards
- filtros básicos no servidor
- detalhe da oferta dentro do próprio widget

### Evolução da experiência

A POC evoluiu para um fluxo mais próximo do padrão de apps no ChatGPT:

- **cards inline** com visual mais integrado ao host
- **detalhe em fullscreen** solicitado via bridge do `window.openai`
- retorno da vitrine para a conversa inline sem perder o contexto
- comportamento melhorado para casos em que não há necessidade de renderizar widget

### Refinamentos de interface

Também foram incorporados refinamentos de UX e UI:

- carrossel revisado para desktop e mobile
- ajustes de scroll e altura intrínseca do widget
- tratamento de `safeArea` no fullscreen mobile
- tema claro/escuro com tokens centralizados
- visual mais alinhado ao ecossistema do ChatGPT

### Preparação para integração backend

Mais recentemente, o projeto passou a incluir a base da integração server-side com a API de ofertas:

- configuração por ambiente no backend
- instância Axios dedicada para `gtiv2`
- service de ofertas desacoplado da UI
- caminho preparado para substituir o mock por dados reais quando o contrato da API estabilizar

---

## Estrutura atual do repositório

```text
lm-rental-pre-poc/
├─ server/
│  ├─ src/
│  │  ├─ config/
│  │  │  └─ Env.ts
│  │  ├─ data/
│  │  │  └─ Offers.ts
│  │  ├─ lib/
│  │  │  └─ FilterOffers.ts
│  │  ├─ services/
│  │  │  ├─ Axios.ts
│  │  │  └─ OfferApiService.ts
│  │  ├─ types/
│  │  │  └─ Config.ts
│  │  └─ index.ts
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ yarn.lock
├─ web/
│  ├─ dist/
│  │  ├─ bundle.js
│  │  ├─ bundle.js.LICENSE.txt
│  │  └─ index.html
│  ├─ public/
│  │  └─ index.html
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ offer-card/
│  │  │  ├─ offer-detail/
│  │  │  └─ offer-list/
│  │  ├─ data/
│  │  ├─ hooks/
│  │  │  └─ useToolResult.ts
│  │  ├─ stylesheets/
│  │  │  ├─ includes/
│  │  │  ├─ App.scss
│  │  │  └─ Themes.scss
│  │  ├─ types/
│  │  │  ├─ openAi.ts
│  │  │  └─ Styles.d.ts
│  │  ├─ App.tsx
│  │  └─ index.tsx
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ tsconfig.webpack.json
│  ├─ webpack.config.ts
│  └─ yarn.lock
├─ .gitignore
└─ README.md
```

A estrutura acima reflete a organização atual do projeto no editor, com novas camadas no `server` para configuração e integração HTTP, além de novas camadas no `web` para tema e tipagem da bridge do host. fileciteturn79file1

---

## Responsabilidades por diretório

### `server/`

Contém o servidor MCP responsável por:

- registrar tools
- registrar a UI resource/template do widget
- aplicar filtros nas ofertas
- devolver `content` e `structuredContent` ao ChatGPT
- preparar a integração com a API GTI V2 no backend

#### `server/src/config/`

Responsável por configuração do backend.

Atualmente concentra:

- seleção de ambiente do server
- endpoints por ambiente
- credenciais necessárias para GTI V2
- defaults e fallback para desenvolvimento

#### `server/src/data/`

Contém a base mockada do catálogo.

Hoje esse diretório continua sendo a **fonte oficial da vitrine**, pois:

- a UI ainda depende do contrato mockado
- a API real ainda está passando por ajustes
- a POC precisa de previsibilidade para validar filtros e experiência

Além da lista, esse arquivo também concentra o type `Offer` que hoje funciona como contrato interno do catálogo. fileciteturn73file3

#### `server/src/lib/`

Contém lógica pura e reutilizável do servidor.

No estado atual, a principal responsabilidade é:

- filtrar, ordenar e normalizar o catálogo mockado a partir dos filtros interpretados pelo modelo

É a camada que concentra a regra de negócio da busca local na POC.

#### `server/src/services/`

Contém a camada de integração HTTP com backend externo.

Nesta etapa, há duas responsabilidades principais:

- criar a instância Axios de `gtiv2`
- chamar o endpoint de ofertas (`GET /vehicles/rentals/offers`)

Essa camada existe para desacoplar a integração real da lógica MCP e deixar a futura troca do mock pela API mais simples.

#### `server/src/types/`

Contém os types auxiliares do backend.

Hoje a responsabilidade principal é tipar:

- configuração por ambiente
- shape da configuração consumida por `Env.ts`

#### `server/src/index.ts`

É o ponto central do backend e continua sendo o orquestrador principal da POC.

Responsabilidades atuais:

- subir o servidor HTTP/MCP
- registrar a resource do widget
- registrar as tools do app
- montar o `structuredContent`
- aplicar filtros server-side
- responder ao ChatGPT no formato esperado pelo Apps SDK

No estado atual do projeto, é nessa camada que o mock ainda é usado diretamente para alimentar a vitrine. fileciteturn79file13

---

### `web/`

Contém o widget React responsável por:

- renderizar lista, cards e detalhe
- consumir o resultado das tools
- controlar a navegação visual entre inline e fullscreen
- adaptar a interface ao host via `displayMode`, `widgetState` e `safeArea`

#### `web/dist/`

Contém o bundle gerado do widget.

Esse bundle é embutido pelo servidor MCP na UI resource que o ChatGPT consome. Sempre que houver mudança no front-end, ele precisa ser regenerado. fileciteturn76file0

#### `web/src/components/`

Contém os componentes visuais principais da experiência:

- `offer-card/`: card resumido da oferta
- `offer-list/`: vitrine/carrossel inline
- `offer-detail/`: detalhe da oferta, usado tanto no standalone quanto no fullscreen

#### `web/src/data/`

Contém dados locais do widget usados em desenvolvimento e standalone.

Esse diretório complementa a experiência local do front sem depender do host.

#### `web/src/hooks/`

Contém hooks de integração com o host.

Hoje, o principal é `useToolResult.ts`, responsável por:

- ler o `toolOutput` inicial do `window.openai`
- escutar `message` e `openai:set_globals`
- sincronizar o resultado da tool com o estado React

Essa camada funciona como a ponte entre o runtime do host e o estado do widget.

#### `web/src/stylesheets/`

Contém a base visual do widget.

Principais responsabilidades atuais:

- `includes/`: variáveis, mixins, helpers e recursos globais de Sass
- `Themes.scss`: tokens e definição centralizada de tema claro/escuro
- `App.scss`: estilo estrutural da aplicação e da casca fullscreen

#### `web/src/types/`

Contém tipos do front-end relacionados ao host e ao build.

Hoje concentra principalmente:

- `openAi.ts`: types da bridge do `window.openai`, `displayMode`, `widgetState`, `safeArea`, `toolOutput` e eventos do host
- `Styles.d.ts`: tipagens auxiliares do ambiente TypeScript/Webpack

#### `web/src/App.tsx`

É o orquestrador visual do widget.

Responsabilidades atuais:

- decidir o que renderizar inline
- abrir detalhe em fullscreen quando necessário
- persistir e restaurar oferta selecionada via `widgetState`
- lidar com `displayMode`
- aplicar `safeArea` no fullscreen mobile
- notificar altura intrínseca do widget quando a lista inline muda

#### `web/src/index.tsx`

É o ponto de entrada do widget React.

Responsabilidades atuais:

- iniciar o React
- montar a aplicação em `#yield`
- garantir que o bundle carregado pelo servidor possa renderizar corretamente no iframe do host

---

## Arquitetura atual

### Visão de alto nível

A arquitetura da POC hoje está dividida em três frentes:

- **server MCP**: dono da lógica de tools e filtros
- **widget React**: dono da renderização e da experiência visual
- **bridge do host (`window.openai`)**: dono da comunicação entre ChatGPT e widget

### Tools do servidor

A POC trabalha com duas responsabilidades distintas no MCP server:

- **buscar candidatos de ofertas**
- **renderizar a vitrine no widget**

Na prática, isso separa a intenção de busca da intenção de UI e dá mais controle ao modelo sobre quando vale ou não renderizar a interface. O `render_vw_offers_widget` é registrado com `openai/outputTemplate` e `resourceUri`, enquanto `find_vw_offers` fica responsável pela parte de busca e estruturação dos dados. fileciteturn79file4turn79file13

### Fonte de dados

Hoje, a fonte de dados usada pela vitrine continua sendo o **mock local de ofertas**.

Esse mock é importante porque:

- estabiliza a POC enquanto a API real ainda passa por ajustes
- preserva um contrato conhecido para o front-end
- permite validar filtro, renderização e UX sem depender do backend final

Ao mesmo tempo, a estrutura do server já começou a ser preparada para integração com GTI V2, com configuração por ambiente e service HTTP dedicados no backend, ainda sem substituir a fonte mockada da UI. A integração do site React existente mostra que o endpoint de interesse é `GET /vehicles/rentals/offers` via instância `gtiv2`, com injeção de `client-key`, `client-token` e `client-session-id`. fileciteturn73file0turn73file1turn73file2

### Estado do widget

O widget hoje trabalha com quatro conceitos principais de estado:

- **`toolOutput` / `structuredContent`**: dados de catálogo vindos do servidor
- **`widgetState`**: estado visual do widget, como a oferta selecionada
- **`displayMode`**: modo de exibição da superfície (`inline` ou `fullscreen`)
- **`safeArea`**: área segura reportada pelo host, relevante no fullscreen mobile

Essa separação foi importante para estabilizar a navegação entre lista inline e detalhe fullscreen, mantendo o dado vindo do server separado do estado efêmero de UI.

---

## Comportamento atual da experiência

### Lista de ofertas

A lista é exibida inline no chat, em formato de carrossel.

#### Desktop

- navegação com setas
- visual mais próximo do padrão de apps do host
- cards com CTA dedicado, sem tornar o card inteiro clicável

#### Mobile

- navegação por gesto horizontal
- dots de paginação
- sem setas visíveis

### Detalhe da oferta

O detalhe da oferta não é mais tratado como um overlay local simples.

Hoje, o fluxo principal é:

1. usuário clica em um card
2. o widget persiste a oferta selecionada
3. o app solicita `fullscreen`
4. o detalhe abre em uma superfície mais ampla do host

No modo standalone/local, o comportamento continua podendo ser visualizado de forma interna para facilitar desenvolvimento.

### Casos sem widget

A experiência atual evita renderização visual desnecessária em cenários como:

- perguntas conceituais sobre veículos
- prompts aleatórios sem necessidade de catálogo
- buscas sem resultado

Nesses casos, a resposta pode permanecer apenas textual no próprio ChatGPT.

### Scroll e altura intrínseca

Na lista inline, o app tenta manter a experiência o mais fluida possível dentro do espaço do host.

Isso envolveu:

- notificação de altura intrínseca do widget
- revisão da rolagem da App inline
- ajuste de fullscreen mobile para evitar sobreposição com o composer

---

## Tema visual

A interface foi ajustada para suportar:

- **tema escuro**
- **tema claro**

A estratégia adotada foi centralizar os tokens visuais e aplicar tema por camada global, em vez de espalhar cores fixas pelos componentes.

### Implicações práticas

- componentes de card, lista e detalhe usam tokens semânticos
- o tema é tratado de forma centralizada
- a UI se adapta melhor ao ambiente do host
- a introdução de `Themes.scss` reduz acoplamento visual entre componentes

---

## Mobile e safe area

No fullscreen mobile, o app considera a área segura do host para reduzir conflito com a caixa de texto do ChatGPT.

Isso evita que o conteúdo do detalhe fique encoberto na parte inferior da tela e mantém a responsabilidade dessa adaptação na casca da aplicação, não espalhada pelo detalhe.

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

> Observação: com a preparação da integração backend, o `server/` pode passar a depender também de bibliotecas HTTP como `axios`, além das dependências já usadas pelo MCP server.

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

- validar se as tools foram registradas
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

### O fullscreen mobile está cobrindo conteúdo

Verificar:

- se o tratamento de `safeArea` está aplicado
- se o app está usando a versão mais recente do bundle
- se o host foi atualizado após mudanças na UI

### O tema claro/escuro está inconsistente

Verificar:

- se `Themes.scss` está sendo carregado na ordem correta
- se ainda existem cores hardcoded em componentes específicos
- se o bundle foi rebuildado após alterações de tema

### A integração com a API não autentica

Verificar:

- se o ambiente do server está correto
- se endpoint, `client-key` e `client-token` do `gtiv2` correspondem ao ambiente
- se a configuração server-side foi realmente carregada
- se os headers do request estão sendo injetados pela instância Axios do backend

---

## Observações importantes

### Sobre o catálogo

O catálogo atual exibido pela UI continua sendo mockado.

Isso é intencional nesta etapa, pois a API real ainda está passando por ajustes de contrato. A integração com backend real é uma evolução prevista, mas ainda não substitui o mock nesta POC.

### Sobre filtros

Nesta POC, os filtros são processados integralmente no servidor.

Isso foi uma decisão intencional para manter o comportamento previsível, facilitar depuração e validar a regra de negócio de forma controlada.

### Sobre fullscreen

O detalhe em fullscreen faz parte da experiência atual da POC.

Ainda assim, a implementação deve ser tratada como uma validação técnica do uso da superfície do host, e não como contrato definitivo da solução final.

### Sobre a integração com API

A integração com a API real está sendo preparada no **server**, não no widget.

Isso é intencional para:

- preservar credenciais fora do front-end
- manter o backend como dono dos dados
- facilitar a futura troca do mock pela API sem reescrever a UI

### Sobre a etapa futura de produto

A etapa de:

- geração de candidatos
- refinamento posterior pelo GPT
- ranking mais sofisticado
- API real como fonte definitiva da vitrine

fica reservada para a evolução do produto final e **não faz parte do escopo atual desta POC**.

---

## Próximos passos esperados

### Curto prazo

- finalizar a validação da integração GTI V2 no server
- confirmar autenticação e resposta do endpoint de ofertas
- estabilizar o contrato da API real
- preparar a troca do catálogo mockado pelo catálogo vindo da API

### Médio prazo

- substituir o mock pela API real de ofertas
- remover adaptações temporárias ligadas ao mock
- revisar a camada de filtros diante do payload final da API
- consolidar o fluxo de catálogo real no MCP server

### Evolução futura do produto

- geração de candidatos
- refinamento posterior pelo GPT
- ranking mais sofisticado
- telemetria
- endurecimento técnico para produção

---

## Referências úteis

### OpenAI Apps SDK
- Quickstart: https://developers.openai.com/apps-sdk/quickstart
- Build your MCP server: https://developers.openai.com/apps-sdk/build/mcp-server
- Build your ChatGPT UI: https://developers.openai.com/apps-sdk/build/chatgpt-ui
- State management: https://developers.openai.com/apps-sdk/build/state-management
- Reference: https://developers.openai.com/apps-sdk/reference

### MCP Inspector
- https://github.com/modelcontextprotocol/inspector

### ngrok
- https://ngrok.com/docs

---

## Contexto do projeto

Este repositório deve ser tratado como artefato de validação técnica.

Em caso de evolução para produto final, recomenda-se abrir uma nova frente para:

- definição do fluxo de candidatos + refinamento pelo GPT
- integração com backend real
- definição de métricas de uso
- endurecimento técnico para produção

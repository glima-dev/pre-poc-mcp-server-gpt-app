import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from '@modelcontextprotocol/ext-apps/server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

import { offers } from './data/Offers.js';
import {
  buildAppliedFilters,
  filterOffers,
} from './lib/FilterOffers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT ?? 2091);
const MCP_PATH = '/mcp';
const TEMPLATE_URI = 'ui://widget/vw-offers-v5.html';

const bundlePath = path.resolve(__dirname, '../../web/dist/bundle.js');
const widgetBundle = readFileSync(bundlePath, 'utf8');

const buildTextFilterSchema = (description: string) =>
  z
    .union([z.string(), z.array(z.string()).min(1)])
    .optional()
    .describe(description);

const buildBooleanFilterSchema = (description: string) =>
  z.boolean().optional().describe(description);

const buildNumberFilterSchema = (description: string) =>
  z.coerce.number().optional().describe(description);

const showOffersInputSchema = {
  city: z
    .string()
    .optional()
    .describe(
      'Cidade ou praça do cliente, caso a conversa peça contextualização regional da oferta.',
    ),

  query: z
    .string()
    .optional()
    .describe(
      'Busca textual livre. Use para intenções abertas como “SUV automático”, “carro mais barato”, “modelo com entrega rápida” ou pedidos menos estruturados.',
    ),

  name: buildTextFilterSchema(
    'Nome comercial do veículo ou da família do carro, como Polo, Tera, T-Cross, Tiguan Allspace ou ID.4.',
  ),
  model: buildTextFilterSchema(
    'Modelo completo ou versão detalhada, como “Polo 1.0 Track” ou “T-Cross 1.0 200 TSI Comfortline Auto”.',
  ),
  slug: buildTextFilterSchema(
    'Slug interno do veículo, útil para integrações, matching técnico ou filtros programáticos.',
  ),
  bodyType: buildTextFilterSchema(
    'Tipo de carroceria, como Hatch, SUVW ou SUV. Quando o usuário pedir SUV, SUVs, veículo SUV ou carroceria SUV, trate como SUVW no catálogo.',
  ),
  tag: buildTextFilterSchema(
    'Tag ou categoria auxiliar da oferta, como elétricos e outras classificações de vitrine.',
  ),
  year: buildTextFilterSchema('Ano/modelo do veículo, por exemplo 25/26, 24/25 ou 23/23.'),
  color: buildTextFilterSchema(
    'Nome da cor do veículo, como Branco Cristal, Preto Ninja, Azul Norway ou Preto Mystic.',
  ),
  paintType: buildTextFilterSchema(
    'Tipo de pintura do veículo, como sólida, metálica ou perolizada.',
  ),
  colorCode: buildTextFilterSchema(
    'Código interno da cor, útil para filtros técnicos ou integração com catálogo.',
  ),
  description: buildTextFilterSchema(
    'Descrição comercial do veículo. Pode ser usada para combinar pedidos por estilo, proposta de uso, perfil do carro ou atributos descritos em linguagem natural.',
  ),
  deliveryInfo: buildTextFilterSchema(
    'Texto de prazo e condição de entrega. Use quando o usuário pedir disponibilidade, urgência, entrega rápida ou limite máximo de dias.',
  ),

  modelCode: buildTextFilterSchema(
    'Código interno da versão/modelo, útil para integrações, auditoria e filtros técnicos.',
  ),

  isElectric: buildBooleanFilterSchema(
    'Filtra veículos elétricos. Use true para pedidos como “somente elétricos” ou “carro elétrico”.',
  ),
  hasShield: buildBooleanFilterSchema(
    'Filtra veículos com blindagem quando esse atributo existir no catálogo.',
  ),
  fastDelivery: buildBooleanFilterSchema(
    'Filtra ofertas com entrega rápida. Use quando o usuário disser que precisa do carro com urgência.',
  ),
  isAvailability: buildBooleanFilterSchema('Filtra ofertas disponíveis para contratação.'),
  isAllUnavailable: buildBooleanFilterSchema(
    'Permite filtrar explicitamente cenários em que todos os itens estejam indisponíveis.',
  ),
  isDeadlineWithinLimit: buildBooleanFilterSchema(
    'Filtra ofertas cujo prazo de entrega esteja dentro do limite considerado aceitável pelo catálogo.',
  ),

  deadline: buildNumberFilterSchema('Prazo contratual exato em meses, como 24 ou 36.'),
  minDeadline: buildNumberFilterSchema('Prazo contratual mínimo em meses.'),
  maxDeadline: buildNumberFilterSchema('Prazo contratual máximo em meses.'),

  monthlyKm: buildNumberFilterSchema(
    'Franquia mensal exata de quilometragem, como 500, 1000 ou 1500 km por mês.',
  ),
  minMonthlyKm: buildNumberFilterSchema('Franquia mensal mínima de quilometragem.'),
  maxMonthlyKm: buildNumberFilterSchema('Franquia mensal máxima de quilometragem.'),

  minMonthlyInstallment: buildNumberFilterSchema('Valor mínimo da parcela mensal da locação.'),
  maxMonthlyInstallment: buildNumberFilterSchema(
    'Valor máximo da parcela mensal da locação. Use para pedidos como “até 3 mil por mês”.',
  ),

  minOverrunKm: buildNumberFilterSchema('Valor mínimo do km excedente.'),
  maxOverrunKm: buildNumberFilterSchema(
    'Valor máximo do km excedente. Use quando o custo por km extra for relevante para o cliente.',
  ),

  minDeliveryDays: buildNumberFilterSchema('Prazo mínimo estimado de entrega em dias.'),
  maxDeliveryDays: buildNumberFilterSchema(
    'Prazo máximo estimado de entrega em dias. Use para pedidos como “entrega em até 30 dias”.',
  ),

  sortBy: z
    .enum([
      'price_asc',
      'price_desc',
      'deadline_asc',
      'deadline_desc',
      'name_asc',
      'name_desc',
      'score_asc',
      'score_desc',
    ])
    .optional()
    .describe(
      'Ordenação dos resultados. Use quando o usuário pedir menor preço, maior preço, menor prazo, ordem alfabética ou priorização por score.',
    ),
};

const renderOffersWidgetInputSchema = showOffersInputSchema;

type RenderOffersWidgetArgs = ShowOffersArgs;

type ShowOffersArgs = {
  city?: string;

  query?: string;

  name?: string | string[];
  model?: string | string[];
  slug?: string | string[];
  bodyType?: string | string[];
  tag?: string | string[];
  year?: string | string[];
  color?: string | string[];
  paintType?: string | string[];
  colorCode?: string | string[];
  description?: string | string[];
  deliveryInfo?: string | string[];

  modelCode?: string | string[];

  isElectric?: boolean;
  hasShield?: boolean;
  fastDelivery?: boolean;
  isAvailability?: boolean;
  isAllUnavailable?: boolean;
  isDeadlineWithinLimit?: boolean;

  deadline?: number;
  minDeadline?: number;
  maxDeadline?: number;

  monthlyKm?: number;
  minMonthlyKm?: number;
  maxMonthlyKm?: number;

  minMonthlyInstallment?: number;
  maxMonthlyInstallment?: number;

  minOverrunKm?: number;
  maxOverrunKm?: number;

  minDeliveryDays?: number;
  maxDeliveryDays?: number;

  sortBy?:
    | 'price_asc'
    | 'price_desc'
    | 'deadline_asc'
    | 'deadline_desc'
    | 'name_asc'
    | 'name_desc'
    | 'score_asc'
    | 'score_desc';
};

const buildOffersFilters = (args?: ShowOffersArgs) => {
  return {
    query: args?.query,

    name: args?.name,
    model: args?.model,
    slug: args?.slug,
    bodyType: args?.bodyType,
    tag: args?.tag,
    year: args?.year,
    color: args?.color,
    paintType: args?.paintType,
    colorCode: args?.colorCode,
    description: args?.description,
    deliveryInfo: args?.deliveryInfo,

    modelCode: args?.modelCode,

    isElectric: args?.isElectric,
    hasShield: args?.hasShield,
    fastDelivery: args?.fastDelivery,
    isAvailability: args?.isAvailability,
    isAllUnavailable: args?.isAllUnavailable,
    isDeadlineWithinLimit: args?.isDeadlineWithinLimit,

    deadline: args?.deadline,
    minDeadline: args?.minDeadline,
    maxDeadline: args?.maxDeadline,

    monthlyKm: args?.monthlyKm,
    minMonthlyKm: args?.minMonthlyKm,
    maxMonthlyKm: args?.maxMonthlyKm,

    minMonthlyInstallment: args?.minMonthlyInstallment,
    maxMonthlyInstallment: args?.maxMonthlyInstallment,

    minOverrunKm: args?.minOverrunKm,
    maxOverrunKm: args?.maxOverrunKm,

    minDeliveryDays: args?.minDeliveryDays,
    maxDeliveryDays: args?.maxDeliveryDays,

    sortBy: args?.sortBy,
  };
};

const findOffers = (args?: ShowOffersArgs) => {
  const filters = buildOffersFilters(args);
  const filteredOffers = filterOffers(offers, filters);
  const appliedFilters = buildAppliedFilters(filters);

  return {
    city: args?.city,
    appliedFilters,
    offers: filteredOffers,
    modelCodes: filteredOffers.map((offer) => offer.modelCode),
    resultCount: filteredOffers.length,
  };
};

const replyWithOffersData = (args?: ShowOffersArgs) => {
  const result = findOffers(args);

  const summaryText =
    result.resultCount > 0
      ? `Encontrei ${result.resultCount} oferta(s) Volkswagen${result.city ? ` para ${result.city}` : ''}.`
      : `Não encontrei ofertas Volkswagen com esses filtros${result.city ? ` para ${result.city}` : ''}.`;

  return {
    content: [
      {
        type: 'text' as const,
        text: summaryText,
      },
    ],
    structuredContent: result,
    _meta: {},
  };
};

const replyWithOffersWidget = (args?: RenderOffersWidgetArgs) => {
  const result = findOffers(args);

  return {
    content: [
      {
        type: 'text' as const,
        text: `Exibindo ${result.resultCount} oferta(s) Volkswagen no widget.`,
      },
    ],
    structuredContent: {
      city: result.city,
      appliedFilters: result.appliedFilters,
      resultCount: result.resultCount,
      offers: result.offers,
    },
    _meta: {},
  };
};

function createOffersServer() {
  const server = new McpServer({
    name: 'lm-rental-pre-poc',
    version: '0.1.0',
  });

  registerAppResource(server, 'vw-offers-widget', TEMPLATE_URI, {}, async () => ({
    contents: [
      {
        uri: TEMPLATE_URI,
        mimeType: RESOURCE_MIME_TYPE,
        text: `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title>VW Offers Widget</title>
  </head>
  <body>
    <div id="yield"></div>
    <script type="module">
${widgetBundle}
    </script>
  </body>
</html>
        `.trim(),
        _meta: {
          'openai/widgetDescription':
            'Exibe ofertas Volkswagen em cards com preço mensal, franquia de km, prazo contratual, custo por km excedente, prazo estimado de entrega, disponibilidade, motorização elétrica, carroceria e filtros aplicados.',
        },
      },
    ],
  }));

  registerAppTool(
    server,
    'find_vw_offers',
    {
      title: 'Buscar candidatos de ofertas Volkswagen',
      description:
        'Use esta ferramenta para buscar, filtrar, ordenar e reduzir o catálogo de ofertas Volkswagen por assinatura. Esta ferramenta serve para encontrar candidatos e devolver resultCount, offers e appliedFilters. Ela não deve ser usada para renderizar cards. Sempre chame esta ferramenta primeiro quando o usuário quiser ver, listar, mostrar, trazer ou abrir ofertas.',
      inputSchema: showOffersInputSchema,
      annotations: {
        readOnlyHint: true,
      },
      _meta: {},
    },
    async (args) => {
      return replyWithOffersData(args);
    },
  );

  registerAppTool(
    server,
    'render_vw_offers_widget',
    {
      title: 'Exibir vitrine de ofertas Volkswagen',
      description:
        'Use esta ferramenta somente para exibir o widget com cards de ofertas Volkswagen. Nunca use como primeiro passo quando houver necessidade de busca. Primeiro chame find_vw_offers para confirmar se existem resultados. Se find_vw_offers retornar uma ou mais ofertas e o objetivo final for mostrar a vitrine, chame esta ferramenta com os mesmos filtros da busca para renderizar os cards. Não use para perguntas conceituais, curiosidades, comparações gerais, respostas puramente textuais ou resultados vazios.',
      inputSchema: renderOffersWidgetInputSchema,
      annotations: {
        readOnlyHint: true,
      },
      _meta: {
        ui: {
          resourceUri: TEMPLATE_URI,
        },
        'openai/outputTemplate': TEMPLATE_URI,
        'openai/toolInvocation/invoking': 'Montando vitrine…',
        'openai/toolInvocation/invoked': 'Vitrine pronta',
      },
    },
    async (args) => {
      return replyWithOffersWidget(args);
    },
  );

  return server;
}

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end('Missing URL');
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);

  if (req.method === 'OPTIONS' && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, mcp-session-id',
      'Access-Control-Expose-Headers': 'Mcp-Session-Id',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' }).end('LM Rental MCP server');
    return;
  }

  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: true }));
    return;
  }

  const allowedMethods = new Set(['POST', 'GET', 'DELETE']);

  if (url.pathname === MCP_PATH && req.method && allowedMethods.has(req.method)) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');

    const server = createOffersServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on('close', () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error('Error handling MCP request:', error);

      if (!res.headersSent) {
        res.writeHead(500).end('Internal server error');
      }
    }

    return;
  }

  res.writeHead(404).end('Not Found');
});

httpServer.listen(PORT, () => {
  console.log(`LM Rental MCP server listening on http://localhost:${PORT}${MCP_PATH}`);
});

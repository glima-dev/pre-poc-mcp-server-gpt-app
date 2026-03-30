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
const TEMPLATE_URI = 'ui://widget/vw-offers-v2.html';

const bundlePath = path.resolve(__dirname, '../../dist/bundle.js');
const widgetBundle = readFileSync(bundlePath, 'utf8');

const showOffersInputSchema = {
  city: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  modelo: z.string().optional(),
  versao: z.string().optional(),
  cor: z.string().optional(),
  prazo: z.string().optional(),
  franquiaKm: z.string().optional(),
  minValor: z.coerce.number().optional(),
  maxValor: z.coerce.number().optional(),
  sortBy: z.enum(['price_asc', 'price_desc']).optional(),
};

const replyWithOffers = (args?: {
  city?: string;
  startDate?: string;
  endDate?: string;
  modelo?: string;
  versao?: string;
  cor?: string;
  prazo?: string;
  franquiaKm?: string;
  minValor?: number;
  maxValor?: number;
  sortBy?: 'price_asc' | 'price_desc';
}) => {
  const period =
    args?.startDate && args?.endDate ? `${args.startDate} a ${args.endDate}` : '13/03 a 16/03';

  const filters = {
    modelo: args?.modelo,
    versao: args?.versao,
    cor: args?.cor,
    prazo: args?.prazo,
    franquiaKm: args?.franquiaKm,
    minValor: args?.minValor,
    maxValor: args?.maxValor,
    sortBy: args?.sortBy,
  };

  const filteredOffers = filterOffers(offers, filters);
  const appliedFilters = buildAppliedFilters(filters);

  const summaryText =
    filteredOffers.length > 0
      ? `Encontrei ${filteredOffers.length} oferta(s) Volkswagen${
          args?.city ? ` para ${args.city}` : ''
        }.`
      : `Não encontrei ofertas Volkswagen com esses filtros${
          args?.city ? ` para ${args.city}` : ''
        }.`;

  return {
    content: [
      {
        type: 'text' as const,
        text: summaryText,
      },
    ],
    structuredContent: {
      city: args?.city ?? 'Belo Horizonte',
      period,
      resultCount: filteredOffers.length,
      appliedFilters,
      offers: filteredOffers,
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
          ui: {
            prefersBorder: true,
          },
          'openai/widgetPrefersBorder': true,
          'openai/widgetDescription': 'Exibe ofertas de aluguel Volkswagen em cards.',
        },
      },
    ],
  }));

  registerAppTool(
    server,
    'show_vw_offers',
    {
      title: 'Mostrar ofertas Volkswagen',
      description:
        'Busca e exibe ofertas mockadas de aluguel de veículos Volkswagen em cards. Use filtros como modelo, versão, cor, prazo, franquia e faixa de preço quando o usuário mencionar essas preferências.',
      inputSchema: showOffersInputSchema,
      annotations: {
        readOnlyHint: true,
      },
      _meta: {
        ui: {
          resourceUri: TEMPLATE_URI,
        },
        'openai/outputTemplate': TEMPLATE_URI,
      },
    },
    async (args) => {
      return replyWithOffers(args);
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

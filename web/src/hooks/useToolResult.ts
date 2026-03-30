import {
  useEffect,
  useState,
} from 'react';

export type ToolStructuredContent = {
  city?: string;
  period?: string;
  resultCount?: number;
  appliedFilters?: Record<string, unknown>;
  offers?: Array<{
    id: number;
    modelo: string;
    versao: string;
    franquiaKm: string;
    prazo: string;
    cor: string;
    valor: number;
  }>;
};

type ToolResult = {
  structuredContent?: ToolStructuredContent;
  content?: Array<{ type: string; text?: string }>;
  _meta?: Record<string, unknown>;
} | null;

type OpenAiGlobalsEvent = CustomEvent<{
  globals?: {
    toolOutput?: ToolStructuredContent;
  };
}>;

declare global {
  interface Window {
    openai?: {
      toolOutput?: ToolStructuredContent;
    };
  }

  interface WindowEventMap {
    'openai:set_globals': OpenAiGlobalsEvent;
  }
}

const getInitialToolResult = (): ToolResult => {
  const initialOutput = window.openai?.toolOutput;

  if (!initialOutput) {
    return null;
  }

  return {
    structuredContent: initialOutput,
  };
};

const useToolResult = () => {
  const [toolResult, setToolResult] = useState<ToolResult>(getInitialToolResult);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) {
        return;
      }

      const message = event.data;

      if (!message || message.jsonrpc !== '2.0') {
        return;
      }

      if (message.method !== 'ui/notifications/tool-result') {
        return;
      }

      setToolResult(message.params ?? null);
    };

    const handleGlobals = (event: OpenAiGlobalsEvent) => {
      const toolOutput = event.detail?.globals?.toolOutput;

      if (!toolOutput) {
        return;
      }

      setToolResult({
        structuredContent: toolOutput,
      });
    };

    window.addEventListener('message', handleMessage, { passive: true });
    window.addEventListener('openai:set_globals', handleGlobals);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('openai:set_globals', handleGlobals);
    };
  }, []);

  return toolResult;
};

export default useToolResult;

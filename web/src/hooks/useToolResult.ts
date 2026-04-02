import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Offer } from '../data/Offers';

export type ToolStructuredContent = {
  city?: string;
  resultCount?: number;
  appliedFilters?: Record<string, unknown>;
  offers?: Offer[];
};

export type WidgetViewState = {
  selectedOfferId?: string | null;
};

export type WidgetDisplayMode = 'inline' | 'pip' | 'fullscreen' | string;

type OpenAiGlobals = {
  toolOutput?: ToolStructuredContent;
  widgetState?: WidgetViewState | null;
  displayMode?: WidgetDisplayMode;
};

export type ToolResult = {
  structuredContent?: ToolStructuredContent;
  content?: Array<{ type: string; text?: string }>;
  _meta?: Record<string, unknown>;
} | null;

type OpenAiGlobalsEvent = CustomEvent<{
  globals?: OpenAiGlobals;
}>;

declare global {
  interface Window {
    openai?: {
      toolOutput?: ToolStructuredContent;
      widgetState?: WidgetViewState | null;
      displayMode?: WidgetDisplayMode;
      maxHeight?: number;
      setWidgetState?: (state: WidgetViewState) => void;
      requestDisplayMode?: (options: { mode: 'inline' | 'pip' | 'fullscreen' }) => Promise<unknown>;
      notifyIntrinsicHeight?: () => void;
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
  const initialToolResult = useMemo(getInitialToolResult, []);
  const [toolResult, setToolResult] = useState<ToolResult>(initialToolResult);
  const [hasResolvedStructuredContent, setHasResolvedStructuredContent] = useState(
    Boolean(initialToolResult?.structuredContent),
  );

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

      const nextToolResult = message.params as ToolResult | undefined;

      if (!nextToolResult?.structuredContent) {
        return;
      }

      setToolResult(nextToolResult);
      setHasResolvedStructuredContent(true);
    };

    const handleGlobals = (event: OpenAiGlobalsEvent) => {
      const toolOutput = event.detail?.globals?.toolOutput;

      if (!toolOutput) {
        return;
      }

      setToolResult({
        structuredContent: toolOutput,
      });
      setHasResolvedStructuredContent(true);
    };

    window.addEventListener('message', handleMessage, { passive: true });
    window.addEventListener('openai:set_globals', handleGlobals);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('openai:set_globals', handleGlobals);
    };
  }, []);

  return {
    toolResult,
    hasResolvedStructuredContent,
  };
};

export default useToolResult;

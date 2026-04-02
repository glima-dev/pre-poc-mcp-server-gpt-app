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

export type OpenAiSafeArea = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export type OpenAiGlobals = {
  toolOutput?: ToolStructuredContent;
  widgetState?: WidgetViewState | null;
  displayMode?: WidgetDisplayMode;
  safeArea?: OpenAiSafeArea;
};

export type ToolResult = {
  structuredContent?: ToolStructuredContent;
  content?: Array<{ type: string; text?: string }>;
  _meta?: Record<string, unknown>;
} | null;

export type OpenAiGlobalsEvent = CustomEvent<{
  globals?: OpenAiGlobals;
}>;

declare global {
  interface Window {
    openai?: {
      toolOutput?: ToolStructuredContent;
      widgetState?: WidgetViewState | null;
      displayMode?: WidgetDisplayMode;
      safeArea?: OpenAiSafeArea;
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

export {};

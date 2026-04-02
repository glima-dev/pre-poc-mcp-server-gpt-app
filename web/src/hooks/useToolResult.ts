import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  OpenAiGlobalsEvent,
  ToolResult,
} from '../types/OpenAi';

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

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import OfferDetail from './components/offer-detail';
import OfferList from './components/offer-list';
import {
  Offer,
  offers as localOffers,
} from './data/Offers';
import useToolResult, {
  WidgetDisplayMode,
  WidgetViewState,
} from './hooks/useToolResult';

const normalizeWidgetState = (state?: WidgetViewState | null): WidgetViewState => {
  return {
    selectedOfferId: state?.selectedOfferId ?? null,
  };
};

const getInitialDisplayMode = (): WidgetDisplayMode => {
  return window.openai?.displayMode ?? 'inline';
};

const getInitialWidgetState = (): WidgetViewState => {
  return normalizeWidgetState(window.openai?.widgetState);
};

const App = () => {
  const toolResult = useToolResult();

  const structuredContent = toolResult?.structuredContent;

  const isStandalone = window.parent === window;

  const [standaloneSelectedOfferId, setStandaloneSelectedOfferId] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<WidgetDisplayMode>(getInitialDisplayMode);
  const [widgetState, setWidgetState] = useState<WidgetViewState>(getInitialWidgetState);

  const safeWidgetState = normalizeWidgetState(widgetState);

  const offers =
    (structuredContent?.offers as Offer[] | undefined) ?? (isStandalone ? localOffers : []);

  const selectedOfferId = isStandalone
    ? standaloneSelectedOfferId
    : (safeWidgetState.selectedOfferId ?? null);

  const selectedOffer = useMemo(() => {
    return offers.find((offer) => offer.modelCode === selectedOfferId) ?? null;
  }, [offers, selectedOfferId]);

  const isFullscreenDetail =
    !isStandalone && displayMode === 'fullscreen' && Boolean(selectedOffer);

  useEffect(() => {
    if (isStandalone) {
      return;
    }

    const handleGlobals = (event: WindowEventMap['openai:set_globals']) => {
      const globals = event.detail?.globals;

      if (globals?.displayMode !== undefined) {
        setDisplayMode(globals.displayMode);
      }

      if (globals?.widgetState !== undefined) {
        setWidgetState(normalizeWidgetState(globals.widgetState));
      }
    };

    window.addEventListener('openai:set_globals', handleGlobals);

    return () => {
      window.removeEventListener('openai:set_globals', handleGlobals);
    };
  }, [isStandalone]);

  useEffect(() => {
    if (isStandalone) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const yieldElement = document.getElementById('yield');

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousYieldOverflow = yieldElement?.style.overflow ?? '';

    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousYieldOverscroll = yieldElement?.style.overscrollBehavior ?? '';

    if (isFullscreenDetail) {
      html.style.overflow = '';
      body.style.overflow = '';
      html.style.overscrollBehavior = '';
      body.style.overscrollBehavior = '';

      if (yieldElement) {
        yieldElement.style.overflow = '';
        yieldElement.style.overscrollBehavior = '';
      }
    } else {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'none';
      body.style.overscrollBehavior = 'none';

      if (yieldElement) {
        yieldElement.style.overflow = 'hidden';
        yieldElement.style.overscrollBehavior = 'none';
      }
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overscrollBehavior = previousBodyOverscroll;

      if (yieldElement) {
        yieldElement.style.overflow = previousYieldOverflow;
        yieldElement.style.overscrollBehavior = previousYieldOverscroll;
      }
    };
  }, [isStandalone, isFullscreenDetail, displayMode]);

  useEffect(() => {
    if (isStandalone || isFullscreenDetail) {
      return;
    }

    const rootElement = document.getElementById('yield') ?? document.body;

    let frame = 0;
    let timeoutId: number | undefined;

    const notify = () => {
      window.openai?.notifyIntrinsicHeight?.();
    };

    const scheduleNotify = () => {
      window.cancelAnimationFrame(frame);

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      frame = window.requestAnimationFrame(() => {
        notify();
      });

      timeoutId = window.setTimeout(() => {
        notify();
      }, 200);
    };

    scheduleNotify();

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            scheduleNotify();
          })
        : null;

    observer?.observe(rootElement);

    return () => {
      window.cancelAnimationFrame(frame);

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      observer?.disconnect();
    };
  }, [isStandalone, isFullscreenDetail, displayMode, toolResult]);

  const handleOpenOffer = async (offer: Offer) => {
    if (isStandalone) {
      setStandaloneSelectedOfferId(offer.modelCode);
      return;
    }

    const nextState: WidgetViewState = {
      ...safeWidgetState,
      selectedOfferId: offer.modelCode,
    };

    window.openai?.setWidgetState?.(nextState);
    setWidgetState(nextState);

    await window.openai?.requestDisplayMode?.({ mode: 'fullscreen' });
  };

  const handleCloseDetail = async () => {
    if (isStandalone) {
      setStandaloneSelectedOfferId(null);
      return;
    }

    const nextState: WidgetViewState = {
      ...safeWidgetState,
      selectedOfferId: null,
    };

    window.openai?.setWidgetState?.(nextState);
    setWidgetState(nextState);

    await window.openai?.requestDisplayMode?.({ mode: 'inline' });
  };

  if (isFullscreenDetail && selectedOffer) {
    return (
      <main className='App App--fullscreen'>
        <OfferDetail offer={selectedOffer} onClose={handleCloseDetail} variant='fullscreen' />
      </main>
    );
  }

  console.log(
    'offers renderizados:',
    offers.map((offer) => offer.modelCode),
  );

  return (
    <main className='App'>
      <header className='App__header'>
        <h1 className='App__title'>Ofertas de assinatura que correspondem à sua pesquisa</h1>
      </header>

      <section className='App__workspace'>
        <OfferList offers={offers} onOfferClick={handleOpenOffer} />
      </section>

      {isStandalone && selectedOffer && (
        <section className='App__standalone-detail'>
          <OfferDetail offer={selectedOffer} onClose={handleCloseDetail} variant='inline' />
        </section>
      )}
    </main>
  );
};

export default App;

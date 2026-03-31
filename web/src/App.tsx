import { useState } from 'react';

import OfferDetail from './components/offer-detail';
import OfferList from './components/offer-list';
import {
  Offer,
  offers as localOffers,
} from './data/Offers';
import useToolResult from './hooks/useToolResult';

const App = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const toolResult = useToolResult();
  const structuredContent = toolResult?.structuredContent;

  const isStandalone = window.parent === window;

  const offers =
    (structuredContent?.offers as Offer[] | undefined) ?? (isStandalone ? localOffers : []);

  const isDetailOpen = Boolean(selectedOffer);

  return (
    <main className='App'>
      <header className='App__header'>
        <h1 className='App__title'>Ofertas de assinatura que correspondem à sua pesquisa</h1>
      </header>

      <section className={`App__workspace ${isDetailOpen ? 'App__workspace--detail-open' : ''}`}>
        <div className='App__list-layer'>
          <OfferList offers={offers} onOfferClick={setSelectedOffer} />
        </div>

        {selectedOffer && (
          <div className='App__detail-layer'>
            <OfferDetail offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
          </div>
        )}
      </section>
    </main>
  );
};

export default App;

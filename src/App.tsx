import 'swiper/css/bundle';

import {
  A11y,
  FreeMode,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import OfferCard from './components/offer-card';
import { offers as localOffers } from './data/Offers';
import useToolResult from './hooks/useToolResult';

type Offer = {
  id: number;
  modelo: string;
  versao: string;
  franquiaKm: string;
  prazo: string;
  cor: string;
  valor: number;
};

const App = () => {
  const toolResult = useToolResult();
  const structuredContent = toolResult?.structuredContent;

  const isStandalone = window.parent === window;

  const offers =
    (structuredContent?.offers as Offer[] | undefined) ?? (isStandalone ? localOffers : []);
  const city = structuredContent?.city ?? (isStandalone ? 'Belo Horizonte' : '');
  const period = structuredContent?.period ?? (isStandalone ? '13/03 a 16/03' : '');

  return (
    <main className='App'>
      <header className='App__header'>
        <span className='App__eyebrow'>Pré-POC</span>

        <h1 className='App__title'>Ofertas de aluguel Volkswagen</h1>

        <p className='App__description'>Estrutura mínima em React, TypeScript, Webpack e SCSS.</p>

        {(period || city) && (
          <p className='App__context'>
            {period}
            {period && city ? ' • ' : ''}
            {city}
          </p>
        )}
      </header>

      {offers.length > 0 ? (
        <section className='App__carousel-wrapper' aria-label='Lista de ofertas'>
          <Swiper
            className='App__carousel'
            modules={[FreeMode, A11y]}
            slidesPerView='auto'
            spaceBetween={12}
            freeMode
            grabCursor>
            {offers.map((offer) => (
              <SwiperSlide key={offer.id} className='App__slide'>
                <OfferCard offer={offer} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ) : (
        <section className='App__empty'>
          <p className='App__empty-text'>Nenhuma oferta encontrada para os filtros informados.</p>
        </section>
      )}
    </main>
  );
};

export default App;

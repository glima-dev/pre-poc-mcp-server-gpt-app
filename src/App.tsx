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
import { offers } from './data/Offers';

const App = () => {
  return (
    <main className='App'>
      <header className='App__header'>
        <span className='App__eyebrow'>Pré-POC</span>

        <h1 className='App__title'>Ofertas de aluguel Volkswagen</h1>

        <p className='App__description'>Estrutura mínima em React, TypeScript, Webpack e SCSS.</p>

        <p className='App__context'>13/03 a 16/03 • Belo Horizonte</p>
      </header>

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
    </main>
  );
};

export default App;

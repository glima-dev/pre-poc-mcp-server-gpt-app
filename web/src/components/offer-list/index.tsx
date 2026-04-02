import 'swiper/css/bundle';

import {
  A11y,
  FreeMode,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import { Offer } from '../../data/Offers';
import OfferCard from '../offer-card';
import './index.scss';

type Props = {
  offers: Offer[];
  onOfferClick?: (offer: Offer) => void;
  shouldShowEmptyState?: boolean;
};

const OfferList = ({ offers, onOfferClick, shouldShowEmptyState = true }: Props) => {
  if (!offers.length) {
    if (!shouldShowEmptyState) {
      return null;
    }

    return (
      <section className='OfferList__empty' aria-live='polite'>
        <div className='OfferList__empty-content'>
          <h2 className='OfferList__empty-title'>Não encontramos ofertas para essa busca</h2>

          <p className='OfferList__empty-text'>
            Tente ajustar os filtros para visualizar outras opções de assinatura disponíveis.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='OfferList' aria-label='Lista de ofertas'>
      <Swiper
        className='OfferList__carousel'
        modules={[FreeMode, A11y]}
        slidesPerView='auto'
        spaceBetween={16}
        freeMode
        grabCursor>
        {offers.map((offer) => (
          <SwiperSlide key={offer.modelCode} className='OfferList__slide'>
            <OfferCard offer={offer} onClick={onOfferClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OfferList;

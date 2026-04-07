import 'swiper/css/bundle';

import { useId } from 'react';
import {
  A11y,
  FreeMode,
  Navigation,
  Pagination,
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
};

const OfferList = ({ offers, onOfferClick }: Props) => {
  const instanceId = useId().replace(/:/g, '');
  const prevButtonClassName = `OfferList__nav-button--prev-${instanceId}`;
  const nextButtonClassName = `OfferList__nav-button--next-${instanceId}`;
  const paginationClassName = `OfferList__pagination-${instanceId}`;

  if (!offers.length) {
    return null;
  }

  return (
    <section className='OfferList' aria-label='Lista de ofertas'>
      <div className='OfferList__header'>
        <div className='OfferList__pagination-wrap'>
          <div className={`OfferList__pagination ${paginationClassName}`} />
        </div>

        <div className='OfferList__nav'>
          <button
            className={`OfferList__nav-button ${prevButtonClassName}`}
            type='button'
            aria-label='Voltar ofertas'>
            ←
          </button>

          <button
            className={`OfferList__nav-button ${nextButtonClassName}`}
            type='button'
            aria-label='Avançar ofertas'>
            →
          </button>
        </div>
      </div>

      <Swiper
        className='OfferList__carousel'
        modules={[FreeMode, A11y, Navigation, Pagination]}
        slidesPerView='auto'
        spaceBetween={16}
        freeMode
        grabCursor
        navigation={{
          prevEl: `.${prevButtonClassName}`,
          nextEl: `.${nextButtonClassName}`,
        }}
        pagination={{
          el: `.${paginationClassName}`,
          clickable: true,
        }}
        watchOverflow>
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

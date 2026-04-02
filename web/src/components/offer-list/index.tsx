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
};

const OfferList = ({ offers, onOfferClick }: Props) => {
  if (!offers.length) {
    return null;
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

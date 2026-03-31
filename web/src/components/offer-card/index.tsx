import { useState } from 'react';

import { Offer } from '../../data/Offers';
import './index.scss';

type Props = {
  offer: Offer;
  onClick?: (offer: Offer) => void;
};

const OfferCard = ({ offer, onClick }: Props) => {
  const [hasImageError, setHasImageError] = useState(false);

  const handleOpenOffer = () => {
    onClick?.(offer);
  };

  return (
    <article className='OfferGridCard'>
      <div className='OfferGridCard__top'>
        <div className='OfferGridCard__header'>
          <div className='OfferGridCard__title-row'>
            <h2 className='OfferGridCard__title'>{offer.name}</h2>
          </div>

          <p className='OfferGridCard__subtitle'>
            {offer.model} • {offer.year}
          </p>
        </div>

        <div className='OfferGridCard__price'>
          <span className='OfferGridCard__price-label'>A partir de</span>

          <p className='OfferGridCard__price-value'>
            {offer.bestCondition.moneyMonthlyInstallment.format}{' '}
            <span className='OfferGridCard__price-suffix'>/ mês</span>
          </p>
        </div>
      </div>

      <div className='OfferGridCard__image'>
        {!hasImageError ? (
          <img src={offer.image} alt={offer.model} onError={() => setHasImageError(true)} />
        ) : (
          <div className='OfferGridCard__image-fallback'>
            <span className='OfferGridCard__image-fallback-text'>Imagem indisponível</span>
          </div>
        )}
      </div>

      <div className='OfferGridCard__action'>
        <button className='OfferGridCard__button' type='button' onClick={handleOpenOffer}>
          Ver Detalhe
        </button>
      </div>
    </article>
  );
};

export default OfferCard;

import { Offer } from '../../data/Offers';
import './index.scss';

type Props = {
  offer: Offer;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const OfferCard = ({ offer }: Props) => {
  return (
    <article className='OfferCard'>
      <div className='OfferCard__header'>
        <span className='OfferCard__brand'>Volkswagen</span>
        <h2 className='OfferCard__model'>{offer.modelo}</h2>
        <p className='OfferCard__version'>{offer.versao}</p>
      </div>

      <ul className='OfferCard__details'>
        <li className='OfferCard__detail'>
          <span className='OfferCard__detail-label'>Franquia</span>
          <strong className='OfferCard__detail-value'>{offer.franquiaKm}</strong>
        </li>

        <li className='OfferCard__detail'>
          <span className='OfferCard__detail-label'>Prazo</span>
          <strong className='OfferCard__detail-value'>{offer.prazo}</strong>
        </li>

        <li className='OfferCard__detail'>
          <span className='OfferCard__detail-label'>Cor</span>
          <strong className='OfferCard__detail-value'>{offer.cor}</strong>
        </li>
      </ul>

      <div className='OfferCard__footer'>
        <div className='OfferCard__price-block'>
          <span className='OfferCard__price-label'>Valor mensal</span>
          <p className='OfferCard__price'>{formatCurrency(offer.valor)}</p>
        </div>

        <button className='OfferCard__button' type='button'>
          Ver oferta
        </button>
      </div>
    </article>
  );
};

export default OfferCard;

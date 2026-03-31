import { Offer } from '../../data/Offers';
import './index.scss';

type Props = {
  offer: Offer;
  onClose: () => void;
};

const OfferDetail = ({ offer, onClose }: Props) => {
  const deliveryInfo = offer.bestCondition.deadlineInfo || offer.deadlineInfo;
  const colorInfo = `${offer.bestCondition.color.color} • ${offer.bestCondition.color.typeOfPainting}`;

  return (
    <section className='OfferDetail' aria-label='Detalhes da oferta'>
      <div className='OfferDetail__panel'>
        <div className='OfferDetail__topbar'>
          <button
            className='OfferDetail__back'
            type='button'
            aria-label='Voltar para a lista'
            onClick={onClose}>
            ←
          </button>
        </div>

        <div className='OfferDetail__content'>
          <div className='OfferDetail__media'>
            <p className='OfferDetail__eyebrow'>Carro por Assinatura {offer.name}</p>

            <p className='OfferDetail__subtitle'>
              {offer.model} • {offer.year}
            </p>

            <div className='OfferDetail__image-frame'>
              <div className='OfferDetail__image'>
                <img src={offer.image} alt={offer.model} />
              </div>
            </div>
          </div>

          <aside className='OfferDetail__summary'>
            <div className='OfferDetail__section'>
              <h3 className='OfferDetail__section-title'>Resumo da oferta</h3>
              <p className='OfferDetail__description'>{offer.description}</p>
            </div>

            <div className='OfferDetail__section'>
              <h3 className='OfferDetail__section-title'>Dados principais</h3>

              <dl className='OfferDetail__list'>
                <div className='OfferDetail__item'>
                  <dt className='OfferDetail__term'>Valor mensal</dt>
                  <dd className='OfferDetail__description-value'>
                    {offer.bestCondition.moneyMonthlyInstallment.format}
                  </dd>
                </div>

                <div className='OfferDetail__item'>
                  <dt className='OfferDetail__term'>Prazo do contrato</dt>
                  <dd className='OfferDetail__description-value'>
                    {offer.bestCondition.deadline} meses
                  </dd>
                </div>

                <div className='OfferDetail__item'>
                  <dt className='OfferDetail__term'>Franquia mensal</dt>
                  <dd className='OfferDetail__description-value'>
                    {offer.bestCondition.monthlyKm} km/mês
                  </dd>
                </div>

                <div className='OfferDetail__item'>
                  <dt className='OfferDetail__term'>Cor e pintura</dt>
                  <dd className='OfferDetail__description-value'>{colorInfo}</dd>
                </div>

                <div className='OfferDetail__item'>
                  <dt className='OfferDetail__term'>Prazo de entrega</dt>
                  <dd className='OfferDetail__description-value'>{deliveryInfo}</dd>
                </div>

                <div className='OfferDetail__item OfferDetail__item--last'>
                  <dt className='OfferDetail__term'>Disponibilidade</dt>
                  <dd className='OfferDetail__description-value'>
                    {offer.bestCondition.isAvailability ? 'Disponível' : 'Indisponível'}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default OfferDetail;

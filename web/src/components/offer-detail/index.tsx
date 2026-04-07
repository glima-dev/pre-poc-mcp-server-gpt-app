import { Offer } from '../../data/Offers';
import './index.scss';

type Props = {
  offer: Offer;
  onClose: () => void;
  variant?: 'inline' | 'fullscreen';
};

const OfferDetail = ({ offer, onClose, variant = 'inline' }: Props) => {
  const isFullscreen = variant === 'fullscreen';
  const deliveryInfo = offer.bestCondition.deadlineInfo || offer.deadlineInfo;
  const colorInfo = `${offer.bestCondition.color.color} • ${offer.bestCondition.color.typeOfPainting}`;

  return (
    <section
      className={`OfferDetail ${isFullscreen ? 'OfferDetail--fullscreen' : 'OfferDetail--inline'}`}
      aria-label='Detalhes da oferta'>
      <div className='OfferDetail__panel'>
        <div className='OfferDetail__content'>
          <div className='OfferDetail__media'>
            <p className='OfferDetail__eyebrow'>Carro por Assinatura {offer.name}</p>

            {isFullscreen && <h1 className='OfferDetail__title'>{offer.name}</h1>}

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
                  <dt className='OfferDetail__term'>Prazo de entrega</dt>
                  <dd className='OfferDetail__description-value'>{deliveryInfo}</dd>
                </div>

                <div className='OfferDetail__item OfferDetail__item--last'>
                  {/*                   <dt className='OfferDetail__term'>Disponibilidade</dt>
                  <dd className='OfferDetail__description-value'>
                    {offer.bestCondition.isAvailability ? 'Disponível' : 'Indisponível'}
                  </dd> */}

                  <div className='OfferDetail__action'>
                    <a
                      className='OfferDetail__action-link'
                      href={`https://vwsignanddrive.com.br/ofertasvw/${offer.slug}?versao=${offer.modelCode}`}
                      target='_blank'
                      rel='noreferrer'>
                      Simular agora
                    </a>
                  </div>
                </div>
              </dl>
            </div>
          </aside>

          {/*        <div className='OfferDetail__action'>
            <a
              className='OfferDetail__action-link'
              href={`https://vwsignanddrive.com.br/ofertasvw/${offer.slug}?versao=${offer.modelCode}`}
              target='_blank'
              rel='noreferrer'>
              Simular agora
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default OfferDetail;

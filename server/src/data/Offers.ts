export type Offer = {
  id: number;
  modelo: string;
  versao: string;
  franquiaKm: string;
  prazo: string;
  cor: string;
  valor: number;
};

export const offers: Offer[] = [
  {
    id: 1,
    modelo: 'Polo',
    versao: 'Highline 170 TSI AT',
    franquiaKm: '1.000 km/mês',
    prazo: '24 meses',
    cor: 'Branco Cristal',
    valor: 2199,
  },
  {
    id: 2,
    modelo: 'T-Cross',
    versao: 'Comfortline 200 TSI AT',
    franquiaKm: '1.500 km/mês',
    prazo: '36 meses',
    cor: 'Cinza Platinum',
    valor: 2799,
  },
  {
    id: 3,
    modelo: 'Nivus',
    versao: 'Highline 200 TSI AT',
    franquiaKm: '1.000 km/mês',
    prazo: '24 meses',
    cor: 'Azul Biscay',
    valor: 2599,
  },
  {
    id: 4,
    modelo: 'Polo',
    versao: 'Comfortline 170 TSI AT',
    franquiaKm: '1.500 km/mês',
    prazo: '36 meses',
    cor: 'Preto Ninja',
    valor: 2399,
  },
  {
    id: 5,
    modelo: 'Virtus',
    versao: 'Exclusive 250 TSI AT',
    franquiaKm: '2.000 km/mês',
    prazo: '36 meses',
    cor: 'Prata Sirius',
    valor: 2999,
  },
  {
    id: 6,
    modelo: 'T-Cross',
    versao: 'Highline 250 TSI AT',
    franquiaKm: '1.000 km/mês',
    prazo: '24 meses',
    cor: 'Branco Puro',
    valor: 2899,
  },
];

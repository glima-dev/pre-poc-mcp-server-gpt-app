import type { Offer } from '../data/Offers.js';

export type OfferFilters = {
  modelo?: string;
  versao?: string;
  cor?: string;
  prazo?: string;
  franquiaKm?: string;
  minValor?: number;
  maxValor?: number;
  sortBy?: 'price_asc' | 'price_desc';
};

const normalize = (value?: string) => {
  return (value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
};

const includesNormalized = (source?: string, query?: string) => {
  if (!query) {
    return true;
  }

  return normalize(source).includes(normalize(query));
};

export const filterOffers = (offers: Offer[], filters: OfferFilters) => {
  let filtered = offers.filter((offer) => {
    const matchesModelo = includesNormalized(offer.modelo, filters.modelo);
    const matchesVersao = includesNormalized(offer.versao, filters.versao);
    const matchesCor = includesNormalized(offer.cor, filters.cor);
    const matchesPrazo = includesNormalized(offer.prazo, filters.prazo);
    const matchesFranquia = includesNormalized(offer.franquiaKm, filters.franquiaKm);

    const matchesMinValor = typeof filters.minValor !== 'number' || offer.valor >= filters.minValor;

    const matchesMaxValor = typeof filters.maxValor !== 'number' || offer.valor <= filters.maxValor;

    return (
      matchesModelo &&
      matchesVersao &&
      matchesCor &&
      matchesPrazo &&
      matchesFranquia &&
      matchesMinValor &&
      matchesMaxValor
    );
  });

  if (filters.sortBy === 'price_asc') {
    filtered = [...filtered].sort((a, b) => a.valor - b.valor);
  }

  if (filters.sortBy === 'price_desc') {
    filtered = [...filtered].sort((a, b) => b.valor - a.valor);
  }

  return filtered;
};

export const buildAppliedFilters = (filters: OfferFilters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => {
      if (value === undefined || value === null || value === '') {
        return false;
      }

      return true;
    }),
  );
};

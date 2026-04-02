import type { Offer } from '../data/Offers.js';

type TextFilter = string | string[];

export type OfferFilters = {
  query?: string;

  name?: TextFilter;
  model?: TextFilter;
  slug?: TextFilter;
  bodyType?: TextFilter;
  tag?: TextFilter;
  year?: TextFilter;
  color?: TextFilter;
  paintType?: TextFilter;
  colorCode?: TextFilter;
  description?: TextFilter;
  deliveryInfo?: TextFilter;

  modelCode?: TextFilter;

  isElectric?: boolean;
  hasShield?: boolean;
  fastDelivery?: boolean;
  isAvailability?: boolean;
  isAllUnavailable?: boolean;
  isDeadlineWithinLimit?: boolean;

  deadline?: number;
  minDeadline?: number;
  maxDeadline?: number;

  monthlyKm?: number;
  minMonthlyKm?: number;
  maxMonthlyKm?: number;

  minMonthlyInstallment?: number;
  maxMonthlyInstallment?: number;

  minOverrunKm?: number;
  maxOverrunKm?: number;

  minDeliveryDays?: number;
  maxDeliveryDays?: number;

  sortBy?:
    | 'price_asc'
    | 'price_desc'
    | 'deadline_asc'
    | 'deadline_desc'
    | 'name_asc'
    | 'name_desc'
    | 'score_asc'
    | 'score_desc';
};

const collator = new Intl.Collator('pt-BR', {
  sensitivity: 'base',
  numeric: true,
});

const normalize = (value?: string) => {
  return (value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
};

const toArray = (value?: TextFilter) => {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

const tokenize = (value?: string) => {
  return normalize(value).split(/\s+/).filter(Boolean);
};

const hasTextFilter = (value?: TextFilter) => {
  return toArray(value).some((item) => normalize(item).length > 0);
};

const expandBodyTypeTerm = (value: string) => {
  const normalized = normalize(value);

  if (!normalized) {
    return [];
  }

  if (normalized.includes('suv')) {
    return ['suv', 'suvw'];
  }

  if (normalized.includes('hatch')) {
    return ['hatch', 'hatchback'];
  }

  if (normalized.includes('sedan') || normalized.includes('seda')) {
    return ['sedan', 'seda'];
  }

  if (
    normalized.includes('picape') ||
    normalized.includes('pickup') ||
    normalized.includes('pick-up') ||
    normalized.includes('pick up')
  ) {
    return ['picape', 'pickup', 'pick-up', 'pick up'];
  }

  return [normalized];
};

const matchesStringField = (
  source: string | undefined,
  filter?: TextFilter,
  expandTerms?: (value: string) => string[],
) => {
  if (!hasTextFilter(filter)) {
    return true;
  }

  const normalizedSource = normalize(source);
  const terms = toArray(filter)
    .flatMap((item) => (expandTerms ? expandTerms(item) : [item]))
    .map(normalize)
    .filter(Boolean);

  return terms.some((term) => normalizedSource.includes(term));
};

const matchesArrayField = (
  source: string[] | undefined,
  filter?: TextFilter,
  expandTerms?: (value: string) => string[],
) => {
  if (!hasTextFilter(filter)) {
    return true;
  }

  const normalizedSource = (source ?? []).map(normalize);
  const terms = toArray(filter)
    .flatMap((item) => (expandTerms ? expandTerms(item) : [item]))
    .map(normalize)
    .filter(Boolean);

  return terms.some((term) => normalizedSource.some((sourceItem) => sourceItem.includes(term)));
};

const getDeliveryInfo = (offer: Offer) => {
  return offer.bestCondition.deadlineInfo ?? offer.deadlineInfo ?? '';
};

const extractDeliveryDays = (offer: Offer) => {
  const normalized = normalize(getDeliveryInfo(offer));
  const matches = [...normalized.matchAll(/(\d+)\s*dias?/g)];

  return matches.map((match) => Number(match[1])).filter((value) => Number.isFinite(value));
};

const matchesDeliveryDaysRange = (
  offer: Offer,
  minDeliveryDays?: number,
  maxDeliveryDays?: number,
) => {
  if (typeof minDeliveryDays !== 'number' && typeof maxDeliveryDays !== 'number') {
    return true;
  }

  const days = extractDeliveryDays(offer);

  if (!days.length) {
    return false;
  }

  return days.some((day) => {
    const matchesMin = typeof minDeliveryDays !== 'number' || day >= minDeliveryDays;
    const matchesMax = typeof maxDeliveryDays !== 'number' || day <= maxDeliveryDays;

    return matchesMin && matchesMax;
  });
};

const hasFastDeliveryFromDeadlineInfo = (offer: Offer) => {
  const days = extractDeliveryDays(offer);

  return days.includes(7);
};

const matchesQuery = (offer: Offer, query?: string) => {
  const tokens = tokenize(query);

  if (!tokens.length) {
    return true;
  }

  const searchableFields = [
    offer.name,
    offer.model,
    offer.slug,
    offer.bodyType,
    offer.year,
    offer.description,
    offer.deadlineInfo,
    offer.bestCondition.deadlineInfo,
    offer.modelCode, // interno
    offer.bestCondition.color.color,
    offer.bestCondition.color.typeOfPainting,
    offer.bestCondition.color.colorCode,
    ...offer.tags,
  ].map(normalize);

  return tokens.every((token) => searchableFields.some((field) => field.includes(token)));
};

const matchesBoolean = (source: boolean | undefined, expected?: boolean) => {
  if (expected === undefined) {
    return true;
  }

  return source === expected;
};

const matchesExactNumber = (source: number | undefined, expected?: number) => {
  if (typeof expected !== 'number') {
    return true;
  }

  return source === expected;
};

const matchesMinNumber = (source: number | undefined, min?: number) => {
  if (typeof min !== 'number') {
    return true;
  }

  if (typeof source !== 'number') {
    return false;
  }

  return source >= min;
};

const matchesMaxNumber = (source: number | undefined, max?: number) => {
  if (typeof max !== 'number') {
    return true;
  }

  if (typeof source !== 'number') {
    return false;
  }

  return source <= max;
};

const sortOffers = (offers: Offer[], sortBy?: OfferFilters['sortBy']) => {
  const sorted = [...offers];

  switch (sortBy) {
    case 'price_asc':
      return sorted.sort(
        (a, b) => a.bestCondition.monthlyInstallment - b.bestCondition.monthlyInstallment,
      );

    case 'price_desc':
      return sorted.sort(
        (a, b) => b.bestCondition.monthlyInstallment - a.bestCondition.monthlyInstallment,
      );

    case 'deadline_asc':
      return sorted.sort((a, b) => a.bestCondition.deadline - b.bestCondition.deadline);

    case 'deadline_desc':
      return sorted.sort((a, b) => b.bestCondition.deadline - a.bestCondition.deadline);

    case 'name_asc':
      return sorted.sort((a, b) => collator.compare(a.name, b.name));

    case 'name_desc':
      return sorted.sort((a, b) => collator.compare(b.name, a.name));

    case 'score_asc':
      return sorted.sort((a, b) => a.bestCondition.score - b.bestCondition.score);

    case 'score_desc':
      return sorted.sort((a, b) => b.bestCondition.score - a.bestCondition.score);

    default:
      return sorted;
  }
};

export const filterOffers = (offers: Offer[], filters: OfferFilters) => {
  const filtered = offers.filter((offer) => {
    const deliveryInfo = getDeliveryInfo(offer);
    const derivedFastDelivery = hasFastDeliveryFromDeadlineInfo(offer);

    const matchesGenericQuery = matchesQuery(offer, filters.query);

    const matchesName = matchesStringField(offer.name, filters.name);
    const matchesModel = matchesStringField(offer.model, filters.model);
    const matchesSlug = matchesStringField(offer.slug, filters.slug);
    const matchesModelCode = matchesStringField(offer.modelCode, filters.modelCode);

    const matchesBodyType = matchesStringField(
      offer.bodyType,
      filters.bodyType,
      expandBodyTypeTerm,
    );

    const matchesTag = matchesArrayField(offer.tags, filters.tag, expandBodyTypeTerm);
    const matchesYear = matchesStringField(offer.year, filters.year);
    const matchesDescription = matchesStringField(offer.description, filters.description);
    const matchesDeliveryInfo = matchesStringField(deliveryInfo, filters.deliveryInfo);

    const matchesColor = matchesStringField(offer.bestCondition.color.color, filters.color);

    const matchesPaintType = matchesStringField(
      offer.bestCondition.color.typeOfPainting,
      filters.paintType,
    );

    const matchesColorCode = matchesStringField(
      offer.bestCondition.color.colorCode,
      filters.colorCode,
    );

    const matchesIsElectric = matchesBoolean(offer.isElectric, filters.isElectric);
    const matchesHasShield = matchesBoolean(offer.hasShield, filters.hasShield);
    const matchesFastDelivery = matchesBoolean(derivedFastDelivery, filters.fastDelivery);
    const matchesAvailability = matchesBoolean(
      offer.isAvailability ?? offer.bestCondition.isAvailability,
      filters.isAvailability,
    );
    const matchesAllUnavailable = matchesBoolean(offer.isAllUnavailable, filters.isAllUnavailable);
    const matchesDeadlineWithinLimit = matchesBoolean(
      offer.isDeadlineWithinLimit,
      filters.isDeadlineWithinLimit,
    );

    const matchesExactDeadline = matchesExactNumber(offer.bestCondition.deadline, filters.deadline);
    const matchesMinDeadline = matchesMinNumber(offer.bestCondition.deadline, filters.minDeadline);
    const matchesMaxDeadline = matchesMaxNumber(offer.bestCondition.deadline, filters.maxDeadline);

    const matchesExactMonthlyKm = matchesExactNumber(
      offer.bestCondition.monthlyKm,
      filters.monthlyKm,
    );
    const matchesMinMonthlyKm = matchesMinNumber(
      offer.bestCondition.monthlyKm,
      filters.minMonthlyKm,
    );
    const matchesMaxMonthlyKm = matchesMaxNumber(
      offer.bestCondition.monthlyKm,
      filters.maxMonthlyKm,
    );

    const matchesMinMonthlyInstallment = matchesMinNumber(
      offer.bestCondition.monthlyInstallment,
      filters.minMonthlyInstallment,
    );
    const matchesMaxMonthlyInstallment = matchesMaxNumber(
      offer.bestCondition.monthlyInstallment,
      filters.maxMonthlyInstallment,
    );

    const matchesMinOverrunKm = matchesMinNumber(
      offer.bestCondition.overrunKm ?? offer.overrunKm,
      filters.minOverrunKm,
    );
    const matchesMaxOverrunKm = matchesMaxNumber(
      offer.bestCondition.overrunKm ?? offer.overrunKm,
      filters.maxOverrunKm,
    );

    const matchesDeliveryDays = matchesDeliveryDaysRange(
      offer,
      filters.minDeliveryDays,
      filters.maxDeliveryDays,
    );

    return (
      matchesGenericQuery &&
      matchesName &&
      matchesModel &&
      matchesSlug &&
      matchesModelCode &&
      matchesBodyType &&
      matchesTag &&
      matchesYear &&
      matchesDescription &&
      matchesDeliveryInfo &&
      matchesColor &&
      matchesPaintType &&
      matchesColorCode &&
      matchesIsElectric &&
      matchesHasShield &&
      matchesFastDelivery &&
      matchesAvailability &&
      matchesAllUnavailable &&
      matchesDeadlineWithinLimit &&
      matchesExactDeadline &&
      matchesMinDeadline &&
      matchesMaxDeadline &&
      matchesExactMonthlyKm &&
      matchesMinMonthlyKm &&
      matchesMaxMonthlyKm &&
      matchesMinMonthlyInstallment &&
      matchesMaxMonthlyInstallment &&
      matchesMinOverrunKm &&
      matchesMaxOverrunKm &&
      matchesDeliveryDays
    );
  });

  return sortOffers(filtered, filters.sortBy);
};

export const buildAppliedFilters = (filters: OfferFilters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => {
      if (value === undefined || value === null) {
        return false;
      }

      if (typeof value === 'string' && value.trim() === '') {
        return false;
      }

      if (Array.isArray(value) && value.length === 0) {
        return false;
      }

      return true;
    }),
  );
};

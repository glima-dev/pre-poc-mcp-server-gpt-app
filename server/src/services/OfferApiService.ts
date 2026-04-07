import type { Offer } from '../data/Offers.js';
import { gtiv2 } from './Axios.js';

export class OfferApiService {
  static async allRentalOffers(): Promise<Offer[]> {
    const response = await gtiv2.get<Offer[]>('/vehicles/rentals/offers');
    return response.data;
  }
}

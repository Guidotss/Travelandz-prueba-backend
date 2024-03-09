import { CheckPickup } from ".";

export interface Pickup {
  address: string | null;
  number: string | null;
  town: string | null;
  zip: string | null;
  description: string;
  altitude: string | null;
  latitude: string | null;
  longitude: string | null;
  checkPickup: CheckPickup;
  pickupId: string | null;
  stopName: string | null;
  image: string | null;
}

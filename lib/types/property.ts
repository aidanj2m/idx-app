export interface PropertyDetails {
  roof?: string;
  style?: string;
  area?: number;
  bathsFull?: number;
  bathsHalf?: number;
  stories?: number;
  fireplaces?: number;
  heating?: string;
  bedrooms?: number;
  interiorFeatures?: string;
  lotSize?: string;
  exteriorFeatures?: string;
  subdivision?: string;
  type?: string;
  yearBuilt?: number;
}

export interface Address {
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  full?: string;
}

export interface ListPrice {
  price?: number;
}

export interface Geo {
  lat?: number;
  lng?: number;
}

export interface Photo {
  url?: string;
  caption?: string;
}

export interface Property {
  mlsId: number;
  property: PropertyDetails;
  address?: Address;
  listPrice?: ListPrice;
  listDate?: string;
  geo?: Geo;
  photos?: Photo[];
  remarks?: string;
}

export interface PropertyFilters {
  limit?: number;
  offset?: number;
  minprice?: number;
  maxprice?: number;
  minbeds?: number;
  maxbeds?: number;
  minbaths?: number;
  maxbaths?: number;
  type?: string;
  q?: string;
}

export interface PropertyListResponse {
  properties: Property[];
  total: number;
  limit: number;
  offset: number;
}

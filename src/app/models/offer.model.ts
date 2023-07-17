export enum OfferType {
  ORDER_IN_RANGE = 'ORDER_IN_RANGE',
  SELECTED_PRODUCTS = 'SELECTED_PRODUCTS',
  ORDER_MIN_AMOUNT = 'ORDER_MIN_AMOUNT',
  ORDER_MAX_AMOUNT = 'ORDER_MAX_AMOUNT',
}

export interface Offer {
  id: number;
  name: string;
  type: OfferType;
  value: number;
  valueType: 'percent' | 'fixed';
  minAmount: number;
  maxAmount: number;
  selectedProductsIds: number[];
}

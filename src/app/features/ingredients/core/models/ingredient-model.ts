export interface Ingredient {
  id: string;
  name: string;
  pricePerPackaging: number;
  quantityPerPackaging: number;
  unitOfMeasurement: UnitOfMeasurement;
  pricePerUnit: number;
}

export enum UnitOfMeasurement {
  KG = 'kg',
  G = 'g',
  L = 'l',
  PCs = 'pcs',
}

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
  ML = 'ml',
  Pcs = 'pcs',
}

export type UnitOfMeasurementMap = {
  [key in UnitOfMeasurement]: {
    unit: UnitOfMeasurement;
    multiplier: number;
  };
};

export const UnitOfMeasurementMapping: UnitOfMeasurementMap = {
  [UnitOfMeasurement.G]: {
    unit: UnitOfMeasurement.KG,
    multiplier: 1000,
  },
  [UnitOfMeasurement.KG]: {
    unit: UnitOfMeasurement.KG,
    multiplier: 1,
  },
  [UnitOfMeasurement.Pcs]: {
    unit: UnitOfMeasurement.Pcs,
    multiplier: 1,
  },
  [UnitOfMeasurement.ML]: {
    unit: UnitOfMeasurement.L,
    multiplier: 1000,
  },
  [UnitOfMeasurement.L]: {
    unit: UnitOfMeasurement.L,
    multiplier: 1,
  },
};

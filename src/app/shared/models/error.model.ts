export interface ErrorModel {
  hasError: boolean;
  errorMessage: string;
}

export enum ErrorType {
  COLLECTION = 'collection',
  ELEMENT = 'element'
}

export interface ErrorState extends ErrorModel {
  errorType: ErrorType;
}

import { ICountry } from 'app/shared/model/country.model';

export interface IContinent {
  id?: number;
  continent?: string;
  countries?: ICountry[];
}

export const defaultValue: Readonly<IContinent> = {};

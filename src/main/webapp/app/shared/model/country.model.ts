import { IContinent } from 'app/shared/model/continent.model';

export interface ICountry {
  id?: number;
  country?: string;
  flag?: string;
  continent?: IContinent;
}

export const defaultValue: Readonly<ICountry> = {};

import { Geo } from './geo.model';
export class Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;

  constructor(obj?: any) {
    this.city          = obj && obj.city             || null;
    this.geo           = obj && obj.geo              || new Geo({});
    this.street        = obj && obj.street           || null;
    this.suite         = obj && obj.suite            || null;
    this.zipcode       = obj && obj.zipcode          || null;
  }
}

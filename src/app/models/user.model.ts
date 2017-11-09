import { Address } from './address.model';
import { Company } from './company.model';
import { Album } from './album.model';

export class User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  album: boolean;
  albums: Album[];

  constructor(obj?: any) {
    this.address       = obj && obj.address          || new Address({});
    this.company       = obj && obj.company          || new Company({});
    this.email         = obj && obj.email            || null;
    this.id            = obj && obj.id               || null;
    this.name          = obj && obj.name             || null;
    this.phone         = obj && obj.phone            || null;
    this.username      = obj && obj.username         || null;
    this.website       = obj && obj.website          || null;
    this.albums = [new Album({})];
    this.album = false;
  }
}

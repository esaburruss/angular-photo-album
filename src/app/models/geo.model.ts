export class Geo {
  lat: string;
  lng: string;

  constructor(obj?: any) {
    this.lat      = obj && obj.lat         || null;
    this.lng      = obj && obj.lng         || null;
  }
}

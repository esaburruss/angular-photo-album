export class Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;

  constructor(obj?: any) {
    this.albumId       = obj && obj.albumId          || null;
    this.id            = obj && obj.id               || null;
    this.title         = obj && obj.title            || null;
    this.url           = obj && obj.url              || null;
    this.thumbnailUrl  = obj && obj.thumbnailUrl     || null;
  }
}

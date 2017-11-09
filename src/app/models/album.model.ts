import { Photo } from './photo.model';

export class Album {
  id: number;
  userId: number;
  title: string;
  thumbnailUrl: string;
  photo: boolean;
  photos: Photo[];

  constructor(obj?: any) {
    this.id            = obj && obj.id               || null;
    this.userId        = obj && obj.userId           || null;
    this.title         = obj && obj.title            || null;
    this.thumbnailUrl  = obj && obj.thumbnailUrl     || '';
    this.photo = false;
    this.photos = [new Photo({})];
  }
}

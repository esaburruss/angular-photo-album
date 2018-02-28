import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'underscore';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user.model';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { Pager } from '../models/pager.model';

@Injectable()
export class ApiService {
  private _users: Map<number,User>;

  private _loadedSource = new Subject<boolean>();
  loaded$ = this._loadedSource.asObservable();
  private _loaded: boolean;

  private _pagerSource = new Subject<Pager>();
  pager$ = this._pagerSource.asObservable();
  private _pager: Pager;

  constructor(private http: HttpClient) {
    this._users = new Map();
  }

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .toPromise()
      .then(res => {
        for(let user in res) {
          this._users.set(res[user].id, res[user]);
        }
        this._loadedSource.next(true);
        this._loaded = true;
        return Array.from(this._users.values());
    });
  }

  getAlbums(user: number): Promise<Album[]> {
    if(
        this._users &&
        this._users.has(+user) &&
        this._users.get(+user).album === true
    ) {
      return Promise.resolve(Array.from(this._users.get(+user).albums.values()));
    } else {
      let url = 'https://jsonplaceholder.typicode.com/users/'+user+'/albums';
      return this.http.get<Album[]>(url)
          .toPromise()
          .then(res => {
            if(!this._users.get(+user).albums) {
              this._users.get(+user).albums = new Map();
            }
            for(let album in res) {
              this._users.get(+user).albums.set(res[album].id, res[album]);
            }
            this._getPhotos(user, res);
            this._users.get(+user).album = true;
            return res;
          });
      }
  }

  getAlbum(user: number, album: number): Promise<Album> {
    if(
        this._users &&
        this._users.has(+user) &&
        this._users.get(+user).album === true
    ) {
      return Promise.resolve(this._users.get(+user).albums.get(+album));
    } else {
      let url = 'https://jsonplaceholder.typicode.com/albums/'+album;
      return this.http.get<Album>(url)
          .toPromise()
          .then(res => {
            if(!this._users.get(+user).albums) {
              this._users.get(+user).albums = new Map();
            }

            this._users.get(+user).albums.set(res.id, res);

            return res;
          });
      }
  }

  getPhotos(user: number, album: number): Promise<Photo[]> {
    if(
      this._users &&
      this._users.has(+user) &&
      this._users.get(+user).album === true &&
      this._users.get(+user).albums &&
      this._users.get(+user).albums.has(+album) &&
      this._users.get(+user).albums.get(+album).photos
    ) {
      return Promise.resolve(Array.from(this._users.get(+user).albums.get(+album).photos.values()));
    } else {
      let url = 'https://jsonplaceholder.typicode.com/albums/' + album +'/photos';
      return this.http.get<Photo[]>(url)
          .toPromise()
          .then(res => {
            this._users.get(+user).albums.get(+album).photos = new Map();
            for(let photo in res) {
              this._users.get(+user).albums.get(+album).photos.set(res[photo].id, res[photo]);
              if(+photo === 0) {
                this._users.get(+user).albums.get(+album).thumbnailUrl = res[photo].thumbnailUrl;
              }
            }
            return Array.from(this._users.get(+user).albums.get(+album).photos.values());
            //return res;
          });
    }
  }

  private _getPhotos(user: number, albums: Album[]) {
    for (let album of albums) {
      this.getPhotos(user, album.id).then(photos => {

        album.photo = true;
        //album.thumbnailUrl = album.photos[0].thumbnailUrl;
      });
    }
  }

  getPagedPhotos(user: number, album: number, currentPage: number = 1, pageSize: number = 10): any {

    if(
      this._users &&
      this._users.has(+user) &&
      //this._users.get(+user).album === true &&
      this._users.get(+user).albums &&
      this._users.get(+user).albums.has(+album) &&
      this._users.get(+user).albums.get(+album).photos
    ) {
      let photos = Array.from(this._users.get(+user).albums.get(+album).photos.values());
      this._pager = this._paged(photos.length, currentPage, pageSize);
      this._pagerSource.next(this._pager);
      return photos.slice(this._pager.startIndex, this._pager.endIndex + 1);
    } else {
      
    }
  }

  getPhoto(user: number, album: number, photo: number): Promise<Photo> {
    if(
      this._users &&
      this._users.has(+user) &&
      //this._users.get(+user).album === true &&
      this._users.get(+user).albums &&
      this._users.get(+user).albums.has(+album) &&
      this._users.get(+user).albums.get(+album).photos &&
      this._users.get(+user).albums.get(+album).photos.has(+photo)
    ) {
      return Promise.resolve(this._users.get(+user).albums.get(+album).photos.get(+photo))
    } else {
      return
    }
  }

  private _getAlbums() {

  }

  private _paged(totalItems: number, currentPage: number = 1, pageSize: number = 10): Pager {
      let totalPages = Math.ceil(totalItems / pageSize);
      let startPage: number, endPage: number;
      if (totalPages <= 10) {
          startPage = 1;
          endPage = totalPages;
      } else {
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
      let pages = _.range(startPage, endPage + 1);
      return new Pager({
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages
      });
  }

  isLoaded(): boolean {
    return this._loaded;
  }

}

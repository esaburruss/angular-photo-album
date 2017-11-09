import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../models/user.model';
import { Album } from '../models/album.model';
import { Photo } from '../models/album.model';

@Injectable()
export class ApiService {
  private _users: User[];
  constructor(private http: Http) {

  }

  getUsers(): Promise<User[]> {
    let promise = new Promise<User[]>((resolve, reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/users')
        .toPromise()
        .then(res => {
          this._users = res.json();
          resolve(this._users);
        });
    });
    return promise;
  }

  getAlbums(user: number): Promise<Album[]> {
    let url = 'https://jsonplaceholder.typicode.com/users/'+user+'/albums';
    let promise = new Promise<Album[]>((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(res => {
          resolve(res.json());
        });
    });
    return promise;
  }

  getPhotos(album: number): Promise<Photo[]> {
    let url = 'https://jsonplaceholder.typicode.com/albums/' + album +'/photos';
    let promise = new Promise<Photo[]>((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(res => {
          resolve(res.json());
        });
    });
    return promise;
  }
}

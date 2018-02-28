import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';

@Injectable()
export class ApiService {
  private _users: User[];
  constructor(private http: HttpClient) {

  }

  getUsers(): Promise<User[]> {

    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .toPromise()
      .then(res => {
        this._users = res;
        return this._users;
    });
  }

  getAlbums(user: number): Promise<Album[]> {
    let url = 'https://jsonplaceholder.typicode.com/users/'+user+'/albums';
    return this.http.get<Album[]>(url)
        .toPromise()
        .then(res => {
          return res;
        });
  }

  getPhotos(album: number): Promise<Photo[]> {
    let url = 'https://jsonplaceholder.typicode.com/albums/' + album +'/photos';
    return this.http.get<Photo[]>(url)
        .toPromise()
        .then(res => {
          return res;
        });
  }
}

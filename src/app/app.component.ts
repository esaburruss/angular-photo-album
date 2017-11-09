import { Component, OnInit } from '@angular/core';

import { ApiService } from './services/api.service';
import { User } from './models/user.model';
import { Album } from './models/album.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',],
})
export class AppComponent implements OnInit {
  title = 'app';
  private users: User[];
  private user: number;
  private album: number;
  private photo: number;
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.users = [new User({})];
    this.user = 0;
    this.album = 0;
    this.photo = 0;
    this.apiService.getUsers().then(users => {
      this.users=users;
      this.loadAlbumsForUser(this.users[this.user]);
    });
  }

  switchUser(event?: any) {
    if(event) {
      this.user = event.nextId.substring(8);
      this.loadAlbumsForUser(this.users[this.user]);
    }
  }

  loadAlbumsForUser(user: User) {
    if(!user.album) {
      this.apiService.getAlbums(user.id).then(albums => {
        user.albums = albums;
        user.album = true;
        this.loadPhotosForAlbums(user.albums);
      });
    }
  }

  loadPhotosForAlbums(albums: Album[]) {
    for (let album of albums) {
      this.apiService.getPhotos(album.id).then(photos => {
        album.photos = photos;
        album.photo = true;
        album.thumbnailUrl = album.photos[0].thumbnailUrl;
      });
    }
  }
}

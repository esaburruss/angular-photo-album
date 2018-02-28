import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Photo } from '../../models/photo.model';
import { Album } from '../../models/album.model';

@Component({
  templateUrl: 'photo.component.html'
})
export class PhotoComponent implements OnInit {
  private user: number;
  private album: number;
  private photo: Photo;
  private _ready: boolean;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route:ActivatedRoute,
  ) {
    this.album = 0;
    this.user = 0;
    this.photo = new Photo({});
    this._ready = false;

    this._ready = this.apiService.isLoaded();

    apiService.loaded$.subscribe(_ready => {
      this._ready = _ready;
      this.loadPhoto();
    });
  }

  ngOnInit() {
    this.album = this.route.snapshot.params['albumId'];
    this.user = this.route.snapshot.params['userId'];
    if(this._ready) {
      this.loadPhoto();
    }
  }

  loadPhoto() {
    this.apiService.getAlbum(this.user, this.album).then(album=> {
      this.apiService.getPhotos(this.user, this.album).then(photos => {
        this.apiService.getPhoto(this.user, this.album, this.route.snapshot.params['photoId'])
          .then(photo => {
            this.photo = photo;
          });
      });
    });
    /*this.apiService.getPhoto(this.user, this.album, this.route.snapshot.params['photoId'])
      .then(photo => {
        this.photo = photo;
      });*/
  }
}

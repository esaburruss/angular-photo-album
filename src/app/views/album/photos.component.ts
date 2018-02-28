import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Photo } from '../../models/photo.model';
import { Album } from '../../models/album.model';

@Component({
  templateUrl: 'photos.component.html'
})
export class PhotosComponent implements OnInit {
  private album: Album;
  private user: number;
  private photos: Photo[];
  private _ready: boolean;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route:ActivatedRoute,
  ) {
    this.album = new Album({});
    this.user = 0;
    this._ready = false;

    this._ready = this.apiService.isLoaded();

    apiService.loaded$.subscribe(_ready => {
      this._ready = _ready;
      this.loadPhotosForAlbum();
    });
  }

  ngOnInit() {
    this.album = this.route.snapshot.params['albumId'];
    this.user = this.route.snapshot.params['userId'];
    if(this._ready) {
      this.loadPhotosForAlbum();
    }
  }

  loadPhotosForAlbum() {
    this.apiService.getAlbum(this.user, this.route.snapshot.params['albumId']).then(album=> {
      this.album=album;
      this.apiService.getPhotos(this.user, this.route.snapshot.params['albumId']).then(photos => {
        this.photos = photos;
      });
    });
  }

  backClicked() {

  }
}

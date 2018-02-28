import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Photo } from '../../models/photo.model';

@Component({
  templateUrl: 'photos.component.html'
})
export class PhotosComponent implements OnInit {
  private album: number;
  private user: number;
  private photos: Photo[];
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route:ActivatedRoute,
  ) {
    this.album = 0;
    this.user = 0;
  }

  ngOnInit() {
    this.album = this.route.snapshot.params['albumId'];
    this.user = this.route.snapshot.params['userId'];
    this.loadPhotosForAlbum(this.album);
  }

  loadPhotosForAlbum(album: number) {
    this.apiService.getPhotos(album).then(photos => {
      this.photos = photos;
      //album.thumbnailUrl = album.photos[0].thumbnailUrl;
    });
  }

  backClicked() {

  }
}

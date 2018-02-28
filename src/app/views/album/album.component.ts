import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Album } from '../../models/album.model';

@Component({
  templateUrl: 'album.component.html',
  styleUrls: ['./album.component.css',],
})
export class AlbumComponent implements OnInit {
  private user: number;
  private albums: Album[];
  private _ready: boolean;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route:ActivatedRoute,
  ) {
    this._ready = this.apiService.isLoaded();
    this.apiService.loaded$.subscribe(_ready => {
      this._ready = _ready;
      this.user = this.route.snapshot.params['userId'];
      this.loadAlbumsForUser(this.user);
    });
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.user = this.route.snapshot.params['userId'];
        if(this._ready) {
          this.loadAlbumsForUser(this.user);
        }
      }
    });
  }

  ngOnInit() {
    this.user = this.route.snapshot.params['userId'];

  }

  loadAlbumsForUser(user: number) {
    //if(!user.album) {
      this.apiService.getAlbums(user).then(albums => {
        this.albums = albums;
        //user.album = true;
        //this.loadPhotosForAlbums(user.albums);
      });
    //}
  }

  albumClick(event: any) {
    console.log(event)
  }
}

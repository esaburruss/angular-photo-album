import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AlbumComponent } from './album.component';
import { PhotosComponent } from './photos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '1/album',
    pathMatch: 'full',
  },
  {
    path: ':userId/album',
    component: AlbumComponent,
    data: {
      title: 'Album'
    }
  },
  {
    path: ':userId/album/:albumId/photos',
    component: PhotosComponent,
    data: {
      title: 'Photos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule {}

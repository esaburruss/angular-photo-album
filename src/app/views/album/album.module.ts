import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AlbumComponent } from './album.component';
import { PhotosComponent } from './photos.component';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  imports: [
    AlbumRoutingModule,
    ChartsModule,
    TabsModule.forRoot(),
    CommonModule
  ],
  declarations: [
    AlbumComponent,
    PhotosComponent
  ]
})
export class AlbumModule { }

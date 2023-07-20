import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverMovesIndexPageRoutingModule } from './driver-moves-index-routing.module';

import { DriverMovesIndexPage } from './driver-moves-index.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverMovesIndexPageRoutingModule
  ],
  declarations: [DriverMovesIndexPage]
})
export class DriverMovesIndexPageModule {}

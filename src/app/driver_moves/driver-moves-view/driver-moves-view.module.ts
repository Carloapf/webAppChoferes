import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverMovesViewPageRoutingModule } from './driver-moves-view-routing.module';

import { DriverMovesViewPage } from './driver-moves-view.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverMovesViewPageRoutingModule,
    MdbRippleModule,
  ],
  declarations: [DriverMovesViewPage,]
})
export class DriverMovesViewPageModule {}

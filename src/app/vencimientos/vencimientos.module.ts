import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VencimientosPageRoutingModule } from './vencimientos-routing.module';

import { VencimientosPage } from './vencimientos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VencimientosPageRoutingModule
  ],
  declarations: [VencimientosPage]
})
export class VencimientosPageModule {}

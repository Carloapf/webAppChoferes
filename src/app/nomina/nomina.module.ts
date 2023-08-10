import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NominaPageRoutingModule } from './nomina-routing.module';

import { NominaComponent } from './nomina.component';
import { LuDatePipe } from '../pipes/luDate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NominaPageRoutingModule
  ],
  declarations: [NominaComponent, LuDatePipe]
})
export class NominaPageModule {}

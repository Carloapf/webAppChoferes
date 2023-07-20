import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NominaPageRoutingModule } from './nomina-routing.module';

import { NominaComponent } from './nomina.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NominaPageRoutingModule
  ],
  declarations: [NominaComponent]
})
export class NominaPageModule {}

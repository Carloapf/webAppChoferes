import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirmaPageRoutingModule } from './firma-routing.module';

import { FirmaComponent } from './firma.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirmaPageRoutingModule
  ],
  declarations: [FirmaComponent]
})
export class FirmaPageModule {}

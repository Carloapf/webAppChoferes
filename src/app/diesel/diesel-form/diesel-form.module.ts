import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DieselFormPageRoutingModule } from './diesel-form-routing.module';

import { DieselFormComponent } from './diesel-form.component';
import { LuDatePipe } from "../pipes/luDate.pipe";
import { FirmaPageModule } from './modals/firma/firma.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DieselFormPageRoutingModule,
    FirmaPageModule
  ],
  declarations: [DieselFormComponent,  LuDatePipe],
  providers:[],
  exports:[LuDatePipe]
})
export class DieselFormPageModule {}

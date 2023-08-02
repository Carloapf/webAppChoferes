import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DieselViewPageRoutingModule } from './diesel-view-routing.module';

import { DieselViewComponent } from './diesel-view.component';
//import { LuDatePipe } from "../pipes/luDate.pipe";
import { DieselFormPageModule } from "../diesel-form/diesel-form.module";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DieselViewPageRoutingModule,
    DieselFormPageModule,
    
    
  ],
  declarations: [DieselViewComponent,],
  providers: []
})
export class DieselViewPageModule {}

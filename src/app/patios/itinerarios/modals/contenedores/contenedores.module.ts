import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContenedoresComponentRoutingModule } from './contenedores-routing.module';

import { ContenedoresComponent } from './contenedores.component';
//import { LuDatePipe } from "../pipes/luDate.pipe";
//import { DieselFormPageModule } from "../diesel-form/diesel-form.module";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContenedoresComponentRoutingModule,
    
    
    
  ],
  declarations: [ContenedoresComponent,],
  providers: []
})
export class ContenedoresComponentModule {}

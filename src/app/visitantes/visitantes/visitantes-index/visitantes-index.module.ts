import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitantesIndexComponentRoutingModule } from './visitantes-index-routing.module';

import { VisitantesIndexComponent } from './visitantes-index.component';
//import { PipeModule } from 'src/app/filterPipe.module';
import { PipeModule } from '../../pipes/filterPipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule.forRoot(),
    VisitantesIndexComponentRoutingModule
  ],
  declarations: [VisitantesIndexComponent]
})
export class VisitantesIndexComponentModule {}

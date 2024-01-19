import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../../pipes/filterPipe.module';
import { IonicModule } from '@ionic/angular';

import { VisitantesCreateComponentRoutingModule } from './visitantes-create-routing.module';

import { VisitantesCreateComponent } from './visitantes-create.component';

import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule.forRoot(),
    VisitantesCreateComponentRoutingModule,
    MdbTabsModule,
  ],
  declarations: [VisitantesCreateComponent]
})
export class VisitantesCreateComponentModule {}

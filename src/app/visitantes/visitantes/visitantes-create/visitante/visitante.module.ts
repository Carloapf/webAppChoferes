import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitanteComponentRoutingModule } from './visitante-routing.module';

import { VisitanteComponent } from './visitante.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitanteComponentRoutingModule,
    MdbTabsModule,
  ],
  declarations: [VisitanteComponent]
})
export class VisitanteComponentModule {}

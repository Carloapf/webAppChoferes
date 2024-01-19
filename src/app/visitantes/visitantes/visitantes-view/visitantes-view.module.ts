import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitantesViewComponentRoutingModule } from './visitantes-view-routing.module';

import { VisitantesViewComponent } from './visitantes-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitantesViewComponentRoutingModule
  ],
  declarations: [VisitantesViewComponent]
})
export class VisitantesViewComponentModule {}

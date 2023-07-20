import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvidenciasPageRoutingModule } from './evidencias-routing.module';

import { EvidenciasPage } from './evidencias.component';
//import { ModalComponent } from './modal/modal.component';
import { ModalPageModule } from "./modal/modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvidenciasPageRoutingModule,
    ModalPageModule
  ],
  declarations: [EvidenciasPage,]
})
export class EvidenciasPageModule {}

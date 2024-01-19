import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioComponentRoutingModule } from './inventario-routing.module';

import { InventarioComponent } from './inventario.component';
//import { LuDatePipe } from '../pipes/luDate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioComponentRoutingModule
  ],
declarations: [InventarioComponent, /*LuDatePipe*/]
})
export class InventarioComponentModule {}

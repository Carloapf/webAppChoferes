import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosComponentRoutingModule } from './empleados-routing.module';

import { EmpleadosComponent } from './empleados.component';

import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosComponentRoutingModule,
    MdbTabsModule,
    MdbFormsModule,
  ],
  declarations: [EmpleadosComponent]
})
export class EmpleadosComponentModule {}

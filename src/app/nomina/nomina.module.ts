import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NominaPageRoutingModule } from './nomina-routing.module';

import { NominaComponent } from './nomina.component';
import { DieselFormPageModule } from "../diesel/diesel-form/diesel-form.module";
//import { LuDatePipe } from '../pipes/luDate.pipe';

@NgModule({
    declarations: [NominaComponent,],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NominaPageRoutingModule,
        DieselFormPageModule
    ]
})
export class NominaPageModule {}

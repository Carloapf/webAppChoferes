import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinerariosIndexComponentRoutingModule } from './itinerarios-index-routing.module';

import { ItinerariosIndexComponent } from './itinerarios-index.component';
import { DieselFormPageModule } from "../../../diesel/diesel-form/diesel-form.module";
//import { LuDatePipe } from '../../../pipes/luDate.pipe';

@NgModule({
    declarations: [ItinerariosIndexComponent,],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ItinerariosIndexComponentRoutingModule,
        DieselFormPageModule
    ]
})
export class ItinerariosIndexComponentModule {}

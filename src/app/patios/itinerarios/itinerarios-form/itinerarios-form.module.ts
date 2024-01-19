import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinerariosFormComponentRoutingModule } from './itinerarios-form-routing.module';

import { ItinerariosFormComponent } from './itinerarios-form.component';
import { DieselFormPageModule } from "../../../diesel/diesel-form/diesel-form.module";
//import { LuDatePipe } from '../../../pipes/luDate.pipe';


@NgModule({
    declarations: [ItinerariosFormComponent, ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ItinerariosFormComponentRoutingModule,
        DieselFormPageModule,
        MdbFormsModule,
        ReactiveFormsModule,
        //AlertComponent,
        
    ],
    
})
export class ItinerariosFormComponentModule {}

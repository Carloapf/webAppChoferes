import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspeccionComponentRoutingModule } from './inspeccion-routing.module';

import { InspeccionComponent } from './inspeccion.component';
//import { DieselFormPageModule } from "../../../diesel/diesel-form/diesel-form.module";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';



//import { LuDatePipe } from '../../../pipes/luDate.pipe';

@NgModule({
    declarations: [InspeccionComponent,],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InspeccionComponentRoutingModule,
        
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MdbFormsModule
    ]
})
export class InspeccionComponentModule {}

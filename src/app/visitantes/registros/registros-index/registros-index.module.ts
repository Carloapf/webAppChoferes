import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrosIndexComponentRoutingModule } from './registros-index-routing.module';

import { RegistrosIndexComponent } from './registros-index.component';
import { PipeModule } from '../../pipes/filterPipe.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipeModule.forRoot(),
        RegistrosIndexComponentRoutingModule
    ],
    declarations: [RegistrosIndexComponent]
})
export class RegistrosIndexComponentModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualPageRoutingModule } from './manual-routing.module';

import { ManualComponent } from './manual.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualPageRoutingModule,
    MdbTabsModule,
  ],
  declarations: [ManualComponent]
})
export class ManualPageModule {}

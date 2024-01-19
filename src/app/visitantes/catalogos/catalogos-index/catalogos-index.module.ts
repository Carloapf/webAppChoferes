import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogosIndexComponentRoutingModule } from './catalogos-index-routing.module';

import { CatalogosIndexComponent } from './catalogos-index.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogosIndexComponentRoutingModule
  ],
  declarations: [CatalogosIndexComponent]
})
export class CatalogosIndexComponentModule {}

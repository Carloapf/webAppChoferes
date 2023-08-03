import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DieselIndexPageRoutingModule } from './diesel-index-routing.module';

import { DieselIndexComponent } from './diesel-index.component';

import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DieselIndexPageRoutingModule
  ],
  declarations: [DieselIndexComponent, SearchPipe]
})
export class DieselIndexPageModule {}

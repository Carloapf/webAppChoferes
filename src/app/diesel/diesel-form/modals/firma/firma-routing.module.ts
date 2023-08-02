import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmaComponent } from './firma.component';

const routes: Routes = [
  {
    path: '',
    component: FirmaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirmaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellosPage } from './sellos.component';

const routes: Routes = [
  {
    path: '',
    component: SellosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellosPageRoutingModule {}

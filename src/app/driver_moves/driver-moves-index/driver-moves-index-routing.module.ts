import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverMovesIndexPage } from './driver-moves-index.component';

const routes: Routes = [
  {
    path: '',
    component: DriverMovesIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverMovesIndexPageRoutingModule {}

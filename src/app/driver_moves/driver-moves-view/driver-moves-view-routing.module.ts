import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverMovesViewPage } from './driver-moves-view.component';

const routes: Routes = [
  {
    path: '',
    component: DriverMovesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverMovesViewPageRoutingModule {}

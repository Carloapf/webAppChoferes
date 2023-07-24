import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VencimientosPage } from './vencimientos.component';

const routes: Routes = [
  {
    path: '',
    component: VencimientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VencimientosPageRoutingModule {}

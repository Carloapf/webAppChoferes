import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvidenciasPage } from './evidencias.component';

const routes: Routes = [
  {
    path: '',
    component: EvidenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvidenciasPageRoutingModule {}

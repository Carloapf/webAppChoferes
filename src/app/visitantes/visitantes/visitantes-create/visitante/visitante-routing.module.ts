import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitanteComponent } from './visitante.component';

const routes: Routes = [
  {
    path: '',
    component: VisitanteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitanteComponentRoutingModule {}

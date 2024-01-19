import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitantesIndexComponent } from './visitantes-index.component';

const routes: Routes = [
  {
    path: '',
    component: VisitantesIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitantesIndexComponentRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitantesViewComponent } from './visitantes-view.component';

const routes: Routes = [
  {
    path: '',
    component: VisitantesViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitantesViewComponentRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItinerariosViewComponent } from './itinerarios-view.component';

const routes: Routes = [
  {
    path: '',
    component: ItinerariosViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItinerariosViewComponentRoutingModule {}

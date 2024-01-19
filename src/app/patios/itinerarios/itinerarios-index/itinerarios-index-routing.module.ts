import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItinerariosIndexComponent } from './itinerarios-index.component';

const routes: Routes = [
  {
    path: '',
    component: ItinerariosIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItinerariosIndexComponentRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DieselViewComponent } from './diesel-view.component';

const routes: Routes = [
  {
    path: '',
    component: DieselViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DieselViewPageRoutingModule {}

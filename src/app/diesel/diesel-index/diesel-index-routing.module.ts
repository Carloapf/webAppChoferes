import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DieselIndexComponent } from './diesel-index.component';

const routes: Routes = [
  {
    path: '',
    component: DieselIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DieselIndexPageRoutingModule {}

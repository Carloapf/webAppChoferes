import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DieselFormComponent } from './diesel-form.component';

const routes: Routes = [
  {
    path: '',
    component: DieselFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DieselFormPageRoutingModule {}

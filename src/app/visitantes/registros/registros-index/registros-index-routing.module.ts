import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrosIndexComponent } from './registros-index.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrosIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrosIndexComponentRoutingModule {}

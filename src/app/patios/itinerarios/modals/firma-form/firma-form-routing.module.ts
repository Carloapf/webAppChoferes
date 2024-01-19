import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmaFormComponent } from './firma-form.component';

const routes: Routes = [
  {
    path: '',
    component: FirmaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirmaFormComponentRoutingModule {}

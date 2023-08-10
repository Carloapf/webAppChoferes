import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisionMecanicaComponent } from './revision-mecanica.component';

const routes: Routes = [
  {
    path: '',
    component: RevisionMecanicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionMecanicaPageRoutingModule {}

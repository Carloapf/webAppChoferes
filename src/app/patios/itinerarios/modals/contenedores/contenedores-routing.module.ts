import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenedoresComponent } from './contenedores.component';

const routes: Routes = [
  {
    path: '',
    component: ContenedoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContenedoresComponentRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitantesCreateComponent } from './visitantes-create.component';

const routes: Routes = [
  {
    path: '',
    component: VisitantesCreateComponent
  },
  {
    path: 'visitante',
    loadChildren: () => import('./visitante/visitante.module').then( m => m.VisitanteComponentModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitantesCreateComponentRoutingModule {}

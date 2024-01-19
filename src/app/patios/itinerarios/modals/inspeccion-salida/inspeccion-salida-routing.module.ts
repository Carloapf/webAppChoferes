import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspeccionSalidaComponent } from './inspeccion-salida.component';

const routes: Routes = [
  {
    path: '',
    component: InspeccionSalidaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspeccionSalidaComponentRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogosIndexComponent } from './catalogos-index.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogosIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosIndexComponentRoutingModule {}

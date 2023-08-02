import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'driver-moves-index',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'driver-moves-index',
    loadChildren: () => import('./driver_moves/driver-moves-index/driver-moves-index.module').then(m => m.DriverMovesIndexPageModule)
  },
  {
    path: 'driver-moves-view/:id',
    loadChildren: () => import('./driver_moves/driver-moves-view/driver-moves-view.module').then(m => m.DriverMovesViewPageModule)
  },
  {
    path: 'driver-moves-view/:id/inspeccion',
    loadChildren: () => import('./driver_moves/driver-moves-view/inspeccion/inspeccion.module').then(m => m.InspeccionPageModule)
  },
  {
    path: 'driver-moves-view/:id/evidencias',
    loadChildren: () => import('./driver_moves/driver-moves-view/evidencias/evidencias.module').then(m => m.EvidenciasPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./driver_moves/driver-moves-view/evidencias/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'driver-moves-view/:id/sellos',
    loadChildren: () => import('./driver_moves/driver-moves-view/sellos/sellos.module').then(m => m.SellosPageModule)
  },
  {
    path: 'driver-moves-view/:id/reportes',
    loadChildren: () => import('./driver_moves/driver-moves-view/reportes/reportes.module').then(m => m.ReportesPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then(m => m.ManualPageModule)
  },
  {
    path: 'nomina',
    loadChildren: () => import('./nomina/nomina.module').then(m => m.NominaPageModule)
  },
  {
    path: 'vencimientos',
    loadChildren: () => import('./vencimientos/vencimientos.module').then(m => m.VencimientosPageModule)
  },
  {
    path: 'diesel',
    loadChildren: () => import('./diesel/diesel-index/diesel-index.module').then(m => m.DieselIndexPageModule)
  },
  {
    path: 'diesel-view/:id',
    loadChildren: () => import('./diesel/diesel-view/diesel-view.module').then(m => m.DieselViewPageModule)
  },
  {
    path: 'diesel-view/:id/diesel-form',
    loadChildren: () => import('./diesel/diesel-form/diesel-form.module').then(m => m.DieselFormPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

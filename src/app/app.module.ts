import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicRouteStrategy } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

import {IonicStorageModule} from '@ionic/storage-angular';
import {RouterModule} from '@angular/router';
import { NominaPageModule } from './nomina/nomina.module';
import { ManualPageModule } from "./manual/manual.module";
import { LoginPageModule } from "./login/login.module";
import { DriverMovesIndexPageModule } from "./driver_moves/driver-moves-index/driver-moves-index.module";
import { DriverMovesViewPageModule } from "./driver_moves/driver-moves-view/driver-moves-view.module";
import { SellosPageModule } from "./driver_moves/driver-moves-view/sellos/sellos.module";
import { ReportesPageModule } from "./driver_moves/driver-moves-view/reportes/reportes.module";
import { InspeccionPageModule } from "./driver_moves/driver-moves-view/inspeccion/inspeccion.module";
import { VencimientosPageModule } from "./vencimientos/vencimientos.module";
import { DieselIndexPageModule } from "./diesel/diesel-index/diesel-index.module";
import { DieselViewPageModule } from "./diesel/diesel-view/diesel-view.module";
import { DieselFormPageModule } from './diesel/diesel-form/diesel-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [AppComponent, FilterPipe,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    RouterModule,
    NominaPageModule,
    ManualPageModule,
    LoginPageModule,
    DriverMovesIndexPageModule,
    DriverMovesViewPageModule,
    SellosPageModule,
    ReportesPageModule,
    InspeccionPageModule,
    VencimientosPageModule,
    DieselIndexPageModule,
    DieselViewPageModule,
    DieselFormPageModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    MdbCheckboxModule,
  ],
  providers: [
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

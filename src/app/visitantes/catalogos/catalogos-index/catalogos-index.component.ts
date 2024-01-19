import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import {finalize} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Component(
{
    selector: 'app-catalogos-index',
    templateUrl: './catalogos-index.component.html',
    styleUrls: ['./catalogos-index.component.scss'],
})
export class CatalogosIndexComponent implements OnInit 
{
    loader: any;
    empleados: any;
    empresas: any;
    tipoVisitantes: any;
    gafetes: any;
    cargado: boolean = false;
    ver: any = 0;
    constructor
    (
        private api: ApiService,
        private loading: LoadingController,
        public alertController: AlertController,
        public datepipe: DatePipe
    ) 
    {
        
    }

    ngOnInit() 
    {
        this.getInfo();
    }
    async getInfo()
    {
        this.presentLoading();
        this.api.getEmpleados()
        .subscribe(r => 
        {
            this.empleados = r.data;
            this.api.getEmpresas()
            .subscribe(r => 
            {
                this.empresas = r.data;
                this.api.getTipoVisitantes()
                .subscribe(r => 
                {
                    this.tipoVisitantes = r.data;
                    this.api.getTipoVisitantes2()
                    .pipe(finalize(async () =>
                    {
                        await this.loader.dismiss();
                    }))
                    .subscribe(r => 
                    {
                        this.gafetes = r.data;
                        this.cargado = true;
                    })
                })
            })
        })
    }
    async presentLoading()
    {
        this.loader = await this.loading.create(
        {
            message: 'Cargando...'
        });
        await this.loader.present();
    }
    verCatalogo(x: any)
    {
        if(this.ver == x)
            this.ver = 0;
        else
            this.ver = x;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-visitantes-view',
    templateUrl: './visitantes-view.component.html',
    styleUrls: ['./visitantes-view.component.scss'],
})
export class VisitantesViewComponent implements OnInit 
{
    data: any;
    loader: any;
    id: any;
    ver: boolean = false;
    constructor
    (
        private env: EnvService,
        private api: ApiService,
        private loading: LoadingController,
        private Activatedroute: ActivatedRoute,
    ) 
    {
        this.Activatedroute.paramMap.subscribe(params => 
        { 
            this.id = params.get('id'); 
        });
    }

    ngOnInit() 
    {
        this.getVisitantes();
    }
    async getVisitantes()
    {
        await this.presentLoading();
        this.api.getRegistrosPendientes({id: this.id})
        .pipe(finalize(async () =>
        {
            await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            this.data = r.data[0];
            console.log(this.data);
            this.ver = true;
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
}

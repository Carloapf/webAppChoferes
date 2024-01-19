import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';
import {finalize} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-registros-index',
  templateUrl: './registros-index.component.html',
  styleUrls: ['./registros-index.component.scss'],
})
export class RegistrosIndexComponent implements OnInit 
{
    public Tokenkey: string = TOKEN_KEY;
    version: string;
    search: any;
    registros: any;
    loader: any;
    fechas: any = {};
    items: any;
    actualizar: boolean = false;
    buscado: boolean = false;
    contado: boolean = true;
    constructor
    (
        private env: EnvService,
        private api: ApiService,
        private loading: LoadingController,
        public datepipe: DatePipe
    ) 
    {
        this.version = this.env.Version;
    }

    ngOnInit() 
    {
        this.fechas.inicio = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        this.fechas.fin = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        this.getRegistros();
        this.api.checkVersion(this.version)
        .subscribe(r => 
        {
            this.actualizar = r.data;
        });
    }
    async getRegistros()
    {
        await this.presentLoading();
        this.api.getRegistrosHistorial(this.fechas)
        .pipe(finalize(async () =>
        {
            await this.loader.dismiss();
        }))
        .subscribe((r: { data: any; }) => 
        {
            this.items = r.data;
            console.log(this.items);
            this.buscado = true;
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
    promedioVisitas(items: any)
    {
        return items ? (items.length ? this.averangeTime(items) : '00:00:00') : '00:00:00';
    }
    averangeTime(obj: any) 
    {
        console.log(obj);
        if(!obj) return "00:00:00";
        var seconds = 0;
        for(var x in obj) 
        {
            console.log(obj[x]);
            if(obj[x].salida)
            {
                var hms = obj[x].duracion;   
                var a = hms.split(':'); 
                console.log(a);
                seconds += (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            }
        }
        console.log(seconds);
        return this.toTIME((seconds/(obj.length)));
    }
    toTIME = function (time: any) {
        var sec_num = parseInt(time, 10); // don't forget the second param
        var hours: any   = Math.floor(sec_num / 3600);
        var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }
}

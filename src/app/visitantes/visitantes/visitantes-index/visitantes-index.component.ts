import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EnvService } from 'src/app/services/env.service';
import {finalize} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
const TOKEN_KEY = 'auth-token';
@Component({
    selector: 'app-visitantes-index',
    templateUrl: './visitantes-index.component.html',
    styleUrls: ['./visitantes-index.component.scss'],
})
export class VisitantesIndexComponent implements OnInit 
{
    public Tokenkey: string = TOKEN_KEY;
    version: string;
    search: any;
    registros: any;
    loader: any;
    actualizar: boolean = false;
    buscado: boolean = false;
    enviar: object | any = {};
    constructor
    (
        private env: EnvService,
        private api: ApiService,
        private loading: LoadingController,
        public route: ActivatedRoute,
        public alertController: AlertController,
        public datepipe: DatePipe
    ) 
    {
        this.version = this.env.Version;
    }
    ngOnInit() 
    {
        this.route.paramMap.subscribe((params)=>
        {
            this.getRegistros();
            this.api.checkVersion(this.version)
            .subscribe(r => 
            {
                this.actualizar = r.data;
            });
        });
    }
    async getRegistros()
    {
        await this.presentLoading();
        this.api.getRegistrosPendientes({})
        .pipe(finalize(async () =>
        {
            await this.loader.dismiss();
        }))
        .subscribe((r: { data: any; }) => 
        {
            this.registros = r.data;
            console.log(this.registros);
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
    aceptarSalida(x: any)
    {
        this.enviar.salida = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.enviar.duracion = this.diffTime(x.entrada, this.enviar.salida);
        console.log(this.enviar.duracion);
        this.enviar.id = x.id;
        this.enviar.visitor = x.visitanteID,
        this.enviar.gafete = x.gafeteID;
        this.api.completeRegistro(this.enviar)
        .pipe(finalize(async () => 
        {

        }))
        .subscribe((r: any) => 
        {
            this.getRegistros();
            // this.itinerarioVisto(x);
        })
    };
    async completeVisit(x: any)
    {
        const alert = await this.alertController.create(
        {
            header: 'Confirmar',
            cssClass: 'custom-alert-class',
            message: '¿Se finalizó la visita de '+x.nombre+'?',
            buttons:
            [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => 
                    {
                        // x.Visto = 1;
                    }
                },
                {
                    text: 'Sí',
                    role: 'confirm',
                    handler: () => 
                    {
                        // x.salida = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
                        this.aceptarSalida(x);
                        this.salidaCompleta(x);
                    }
                }
            ]
        });
        await alert.present();
    }
    async salidaCompleta(x: { nombre: string; })
    {
        const alert = await this.alertController.create(
        {
            header: '',
            message: 'Se finalizó la visita de '+x.nombre+'',
            buttons:
            [
                {
                    text: 'OK',
                    handler: () => 
                    {
                    }
                }
            ]
        });
        await alert.present();
    }
    diffTime(start: any, end: any)
    {
        // console.log(start, end);
        var start: any = new Date(start);
        var end: any = new Date(end);
        var milliseconds = end - start;
        var seconds: number = milliseconds / 1000;
        var hours: number = seconds / 3600; 
        var residuoHoras: number = ( hours - Math.trunc(hours)) * 3600;
        hours = Math.trunc(hours);
        var minutes: number = residuoHoras / 60;
        console.log(minutes);
        var residuoMinutos: number = Math.trunc((minutes - Math.trunc(minutes)) * 60);
        minutes = Math.trunc(minutes)
        if(hours < 1)
        {
            hours = 0;
        } 
        if(minutes < 1)
            minutes = 0;
        console.log(hours);
        console.log(residuoHoras);
        console.log(minutes);
        console.log(residuoMinutos);
        console.log(seconds);
        seconds = seconds % 60;
        return (hours < 10 ? "0"+hours :  hours)+":"+(minutes < 10 ? "0"+minutes : minutes)+":"+(residuoMinutos < 10 ? "0"+residuoMinutos : residuoMinutos);
    }
}

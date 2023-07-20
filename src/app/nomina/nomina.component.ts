import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import { ApiService } from '../services/api.service';
const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.scss'],
})

export class NominaComponent implements OnInit {
    public Tokenkey: string = TOKEN_KEY;
    usuario: any;
    loader: HTMLIonLoadingElement | any;
    semanas: any;
    seleccionado: any;
    reporte: any = {};
    buscado: boolean = false;
    info: any;
    constructor
    (
        private api: ApiService,
        private storage: Storage,
        private loading: LoadingController,
        private router: Router,
        public alertController: AlertController
    ) 
    { }
    ngOnInit() 
    {
        this.iniciar();
    }
    iniciar()
    {
        this.storage.get(TOKEN_KEY).then((r) => 
        {
            this.reporte.ChoferID = r?.id;
            this.getSemanasNomina();
        })
    }
    async getSemanasNomina()
    {
        await this.presentLoading();
        this.api.getSemanasNomina()
        .pipe(finalize(async () => 
        {
            await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            this.semanas = r.data;
            setTimeout(() =>
            {
                var objectSelectElement = document.getElementById('semanas');
                //objectSelectElement.compareWith = compareWithFn;
                this.semanas.forEach(function (e: any) {
                var selectOption = document.createElement('ion-select-option');
                selectOption.value = e;
                selectOption.textContent = e.semanaanio;
                objectSelectElement?.appendChild(selectOption);
                });
            }, 0);
        });
    }
    onSeleccionarSemana() {
        console.log(this.seleccionado); // Aquí puedes ver el valor seleccionado en la consola
      }
      

    async presentLoading() 
    {
        this.loader = await this.loading.create(
        {
            message: 'Cargando...',
        });
        await this.loader.present();
    }
    async getValor()
    {
        console.log(this.seleccionado)
        this.reporte.SemanaID = this.seleccionado;
        this.api.getNominaChofer(this.reporte)
        .pipe(finalize(async () => 
        {
            await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            this.buscado = true;
            this.info = r.data;
            console.log(this.info);
        });
    }
}

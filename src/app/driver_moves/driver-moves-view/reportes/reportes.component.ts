import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs/operators';
import { Location } from "@angular/common";
const TOKEN_KEY = 'auth-token';
@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html',
    styleUrls: ['./reportes.component.scss'],
})
export class ReportesPage implements OnInit 
{
    id : any;
    loader: any;
    fallas: any;
    categorias: any;
    reporte: any = [];
    categoria: any;
    fallo: any;
    camion: any;
    objetos: any;
    tipo: any;
    tipos: any;
    subtipo: any;
    advertencias: any;
    ChoferID: any;
    constructor
    (
        private Activatedroute: ActivatedRoute,
        private loading: LoadingController,
        private api: ApiService,
        private storage: Storage,
        public alertController: AlertController,
        private location: Location
    ) 
    {
        this.Activatedroute.paramMap.subscribe(params => 
        { 
        this.id = params.get('id'); 
        });
    }
    ngOnInit() 
    {
        this.tipos = 
        [
        {
            id: 1,
            nombre: "Preventivo"
        },
        {
            id: 2,
            nombre: "Correctivo"
        },
        {
            id: 3,
            nombre: "Advertencia"
        }
        ];
        this.advertencias = 
        [
        {
            id: 1,
            nombre: "90 dias"
        },
        {
            id: 2,
            nombre: "Walk around"
        },
        {
            id: 3,
            nombre: "Chofer"
        }
        ];
        var objectSelectElement = document.getElementById('tipos');
        //objectSelectElement.compareWith = compareWithFn;
        this.tipos.forEach(function (e: any) 
        {
        var selectOption = document.createElement('ion-select-option');
        selectOption.value = e;
        selectOption.textContent = e.nombre;
        if (objectSelectElement !== null) {
          objectSelectElement.appendChild(selectOption);
        }
        //objectSelectElement.appendChild(selectOption);
        });
        this.storage.get(TOKEN_KEY).then((r) => 
        {
        this.ChoferID = r.id;
        });
        this.getInfo();
    }
    async getInfo()
    {
        await this.presentLoading();
        this.api.getFallas()
        .pipe(finalize(async () => 
        {
        }))
        .subscribe(r => 
        {
        this.fallas = r.data;
        this.api.getCategorias()
        .pipe(finalize(async () => 
        {
            await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            this.categorias = r.data;
            setTimeout(() =>
            {
            var objectSelectElement = document.getElementById('categorias');
            //objectSelectElement.compareWith = compareWithFn;
            this.categorias.forEach(function (e: any) 
            {
                var selectOption = document.createElement('ion-select-option');
                selectOption.value = e;
                selectOption.textContent = e.nombre;
                if (objectSelectElement !== null) {
                  objectSelectElement.appendChild(selectOption);
                }
                //objectSelectElement.appendChild(selectOption);
            });
            var objectSelectElement = document.getElementById('fallos');
            //objectSelectElement.compareWith = compareWithFn;
            this.fallas.forEach(function (e: any) 
            {
                var selectOption = document.createElement('ion-select-option');
                selectOption.value = e;
                selectOption.textContent = e.nombre;
                if (objectSelectElement !== null) {
                  objectSelectElement.appendChild(selectOption);
                }
                //objectSelectElement.appendChild(selectOption);
            });
            }, 0);
        });
        });
    }
    async presentLoading() {
        this.loader = await this.loading.create({
        message: 'Cargando...',
        });
        await this.loader.present();
    }
    getObjectos()
    {
        this.reporte.ItinerarioID = this.id;
        this.reporte.CategoriaID = this.categoria.id;
        //console.log(this.reporte);
        this.api.getCategoriasObjetos(this.reporte)
        .pipe(finalize(async () => 
        {
        }))
        .subscribe(r => 
        {
        this.objetos = r.data;
        var objectSelectElement = document.getElementById('objetos');
        //objectSelectElement.compareWith = compareWithFn;
        this.objetos.forEach(function (e: any) 
        {
            var selectOption = document.createElement('ion-select-option');
            selectOption.value = e;
            selectOption.textContent = e.nombre;
            if (objectSelectElement !== null) {
              objectSelectElement.appendChild(selectOption);
            }
            //objectSelectElement.appendChild(selectOption);
        });
        });
    }
    cambiarTipo()
    {
        this.reporte.Tipo = this.tipo.id
        if(this.tipo.id == 3)
        {
        setTimeout(() =>
        {
            var objectSelectElement = document.getElementById('subtipo');
            //objectSelectElement.compareWith = compareWithFn;
            this.advertencias.forEach(function (e: any) 
            {
            var selectOption = document.createElement('ion-select-option');
            selectOption.value = e;
            selectOption.textContent = e.nombre;
            if (objectSelectElement !== null) {
              objectSelectElement.appendChild(selectOption);
            }
            //objectSelectElement.appendChild(selectOption);
            });
        }, 0);
        }
    }
    async enviarReporte()
    {
        await this.presentLoading();
        this.reporte.ChoferID = this.ChoferID;
        this.api.sendReport(this.reporte)
        .pipe(finalize(async () => 
        {
            await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            setTimeout(() =>
            {
                this.sendReport();
            }, 0);
        });
    }
    async sendReport()
    {
        const alert =  await this.alertController.create(
        {
        cssClass: 'my-custom-class',
        header: '',
        message: 'Reporte enviado',
        buttons: [
            {
            text: 'Ok',
            handler: () => 
            {
                this.location.back();
            }
            }
        ]
        });
        await alert.present();
    }
}

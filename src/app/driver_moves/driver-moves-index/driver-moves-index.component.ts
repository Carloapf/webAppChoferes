import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'auth-token';
@Component({
    selector: 'app-driver-moves-index',
    templateUrl: './driver-moves-index.component.html',
    styleUrls: ['./driver-moves-index.component.scss'],
})
export class DriverMovesIndexPage implements OnInit 
{
    public Tokenkey: string = TOKEN_KEY;
    loader: any;
    version: string;
    itinerarios: any = [];
    usuario: any;
    alertas: any = [];
    cargado: any = false;
    actualizar: boolean = false;
    vencimientos: any;
    constructor
    (
        private env: EnvService,
        private api: ApiService,
        private storage: Storage,
        private loading: LoadingController,
        private router: Router,
        public alertController: AlertController,
        public route: ActivatedRoute,
        public auth: AuthenticationService
    ) 
    {
        this.version = this.env.Version;
    }
    ngOnInit() 
    {
        // Se agrega una funcion para que la ejecute siempre que lea la ruta donde esta.
        this.route.paramMap.subscribe((params)=>{
            this.getViajesChofer();
            this.api.checkVersion(this.version)
            .pipe(finalize(async () => 
            {
            //   await this.loader.dismiss();
            }))
            .subscribe(r => 
            {
                this.actualizar = r.data;
            })
        });
    }
    async getViajesChofer()
    {
        await this.presentLoading();
        this.storage.get(TOKEN_KEY).then((r) => 
        {
            this.usuario = r;
            this.auth.user = r;
            console.log(this.usuario);
            this.api.getViajesChofer(this.usuario.id)
            .pipe(finalize(async () => 
            {
                //await this.loader.dismiss();
            }))
            .subscribe(r => 
            {
                this.itinerarios = r.data;
                console.log(this.itinerarios);
                this.api.checkAlertas(this.usuario.id)
                .pipe(finalize(async () => 
                {
                await this.loader.dismiss();
                }))
                .subscribe(r => 
                {
                this.alertas = r.data;
                /*this.api.getVencimientos(this.usuario.id)
                    .pipe(finalize(async () => 
                    {
                        await this.loader.dismiss();
                    }))
                    .subscribe(r =>{
                        this.vencimientos =r.data;
                        this.cargado = true;
                    })*/
                this.cargado = true;
                console.log(this.alertas);
                })
                
            });
        })
    }
    async presentLoading() {
        this.loader = await this.loading.create({
        message: 'Cargando...',
        });
        await this.loader.present();
    }
    goDetails(x: any) 
    {
        console.log(x);
        this.router.navigate(['/driver-moves-view/?id='+x.id])
    }
    aceptarVer(x: { id: any; })
    {
        this.api.itinerarioVisto(x.id)
        .pipe(finalize(async () => 
        {

        }))
        .subscribe(r => 
        {
            this.itinerarioVisto(x);
        })
    };
    async itinerarioVisto(x: { id?: any; Visto?: any; })
    {
        const alert = await this.alertController.create(
        {
        header: '',
        message: 'Driver move aceptado',
        buttons: [
            {
            text: 'Ok',
            handler: () => 
            {
                x.Visto = 1;
            }
            }
        ]
        });
        await alert.present();
    }
}
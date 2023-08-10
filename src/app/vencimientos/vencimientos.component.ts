import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-vencimientos',
  templateUrl: './vencimientos.component.html',
  styleUrls: ['./vencimientos.component.scss'],
})
export class VencimientosPage implements OnInit 
{
    public Tokenkey: string = TOKEN_KEY;
    usuario: any;
    vencimientos: any;
    loader!: HTMLIonLoadingElement;
    cargado: boolean = false;
    info!: { bien: any; mal: any; };
    constructor
    (
        private env: EnvService,
        private api: ApiService,
        private loading: LoadingController,
        private router: Router,
        private storage: Storage
    ) { }

    ngOnInit() 
    {
        this.storage.get(TOKEN_KEY).then((r) => 
        {
            this.usuario = r;
            this.usuario.ChoferID = r.id;
            console.log("Este es el usuario: ", this.usuario);
            this.getVencimientos();
            
        })
    }
    async getVencimientos()
    {
        this.presentLoading()
        .then()
        {
            console.log("Es id de choferes: ", this.usuario);
            this.api.getVencimientos(this.usuario)
            .pipe(finalize(async () => 
            {
                await this.loader.dismiss();
            }))
            .subscribe(r => 
            {
                console.log("despuesd del getVencimientos");
                this.info = 
                {
                    bien: r.data.bien,
                    mal: r.data.mal,
                }
                this.vencimientos = r.data.vencimientos;
                this.cargado = true;
                console.log(this.vencimientos);
            });
        }
    }
    async presentLoading() 
    {
        this.loader = await this.loading.create({
        message: 'Cargando...',
        });
        await this.loader.present();
    }

}

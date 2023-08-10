import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs/operators';
import { Location } from "@angular/common";
import SignaturePad from 'signature_pad';
const TOKEN_KEY = 'auth-token';
@Component({
    selector: 'app-revision',
    templateUrl: './revision-mecanica.component.html',
    styleUrls: ['./revision-mecanica.component.scss'],
})
export class RevisionMecanicaComponent implements OnInit 
{
    @ViewChild('canvas', { static: true })
  signaturePadElement!: { nativeElement: HTMLCanvasElement; };
    @ViewChild('canvas2', { static: true })
  signaturePadElement2!: { nativeElement: HTMLCanvasElement; };
    id: any;
    loader!: HTMLIonLoadingElement;
    puntos: any = [];
    revision: any = {};
    signaturePad: any;
    signaturePad2: any;
    usuario: any;
    constructor
    (
        private Activatedroute: ActivatedRoute,
        private loading: LoadingController,
        private api: ApiService,
        private elementref: ElementRef,
        private storage: Storage,
        public alertController: AlertController,
        private location: Location
    ) 
    {
        this.storage.get(TOKEN_KEY).then((r) => 
        {
            this.usuario = r;
            this.Activatedroute.paramMap.subscribe(params => 
            { 
                this.id = params.get('id'); 
                this.revision.defects = false;
                this.revision.satisfactory = false;
                this.revision.safety = false;
                this.revision.remark = null;
                this.revision.ItinerarioID = +this.id;
                this.revision.ChoferID = this.usuario.id;
            });
        })
    }

    ngOnInit() 
    {
        this.getPuntos()
    }
    async getPuntos()
    {
        await this.presentLoading();
        this.api.getPuntosRevisionMecanica()
        .pipe(finalize(async () => 
        {
            await this.loader.dismiss();
        }))
        .subscribe((r: { data: any; }) => 
        {
            this.puntos = r.data;
            this.addSignature();
        });
    }
    async presentLoading() 
    {
        this.loader = await this.loading.create(
        {
            message: 'Cargando...',
        });
        await this.loader.present();
    }
    clearSignature()
    {
        this.signaturePad.clear();
    }
    clearSignature2()
    {
        this.signaturePad2.clear();
    }
    addSignature()
    {
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
        this.signaturePad.clear();
        this.signaturePad.penColor = 'rgb(56,128,255)';
        this.signaturePad2 = new SignaturePad(this.signaturePadElement2.nativeElement);
        this.signaturePad2.clear();
        this.signaturePad2.penColor = 'rgb(56,128,255)';
    }
    async guardarRevision()
    {
        this.presentLoading().
        then()
        {
            this.revision.firma             = this.signaturePad.toDataURL();
            this.revision.firma_mecanico    = this.signaturePad2.toDataURL();
            var data = 
            {
                puntos: this.puntos,
                revision: this.revision
            };
            this.api.saveRevisionMecanica(data)
            .pipe(finalize(async () => 
            {
                await this.loader.dismiss();
            }))
            .subscribe((r: { data: any; }) => 
            {
                this.sendReport(r.data)
            });
        }
    }
    async sendReport(id: any)
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

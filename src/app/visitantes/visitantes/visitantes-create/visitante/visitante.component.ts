import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera, CameraResultType, CameraOptions } from '@capacitor/camera';
import SignaturePad from 'signature_pad';
@Component({
    selector: 'app-visitante',
    templateUrl: './visitante.component.html',
    styleUrls: ['./visitante.component.scss'],
})
export class VisitanteComponent implements OnInit 
{
    @ViewChild('canvas', { static: true }) signaturePadElement!: { nativeElement: HTMLCanvasElement; };
    nuevoVisitante: any = {}
    nuevoVehiculo: any = {};
    nuevaEmpresa: any = {};
    tipos: any = [];
    empresas: any;
    empresa: any;
    tipo_visitante: any;
    signaturePad: any;
    visitantes: any;
    gafetes: any;
    empleados: any;
    buscado: any;
    ids: any;
    id: any;
    constructor
    (
        private api: ApiService,
        public modalController: ModalController,
        private elementref: ElementRef
    ) { }

    ngOnInit()
    {
        this.getInfo();
        this.addSignature();
        this.getBusquedaVisitantes();
    }
    getBusquedaVisitantes(){
        this.api.getBusquedaVisitantes({})
        .subscribe(r => 
        {
            this.visitantes = r.data;
            console.log(this.visitantes);
            this.ids = this.visitantes.map((objeto: { id: any; }) => objeto.id);
            console.log(this.ids);
            this.api.getTipoVisitantes2()
            .subscribe(r => 
            {
                this.tipos = r.data;
                this.tipos.forEach((e: { id: string | number; }) => 
                {
                    this.api.getGafetesDisponibles({id: e.id})
                    .subscribe(r => 
                    {
                        this.gafetes[e.id] = r.data;
                    })
                });
                this.api.getEmpleados()
                .subscribe(r => 
                {
                    this.empleados = r.data;
                    this.buscado = true;
                    console.log(this.gafetes);
                })
            })
        })
    }
    getInfo()
    {
        this.api.getTipoVisitantes2()
        .subscribe(r => 
        {
            this.tipos = r.data;
            this.api.getEmpresas()
            .subscribe(r => 
            {
                this.empresas = r.data;
            });
        });
    }
    dismiss(data: any)
    {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true,
            data: data
        });
    };
    setEmpresa()
    {
        this.nuevoVisitante.empresa = this.empresa.id;
        console.log(this.nuevoVisitante);
    };
    setVisitante()
    {
        this.nuevoVisitante.tipo = this.tipo_visitante.id;
        console.log(this.nuevoVisitante);
    };
    abrirVisitanteAgregar()
    {
        console.log('entra');
        let modalEmpresa = this.elementref.nativeElement.querySelector('div.modal-empresas');
        modalEmpresa.classList.remove('esconder');
    };
    guardarEmpresa()
    {
        //let modalEmpresa = this.elementref.nativeElement.querySelector('div.modal-empresas');
        this.api.createEmpresa(this.nuevaEmpresa)
        .subscribe(r => 
        {
            this.empresas = r.data;
            this.nuevaEmpresa = {};
            //modalEmpresa.classList.add('esconder');
        });
    };
    cerrarEmpresa()
    {
        let modalEmpresa = this.elementref.nativeElement.querySelector('div.modal-empresas');
        this.nuevaEmpresa = {};
        modalEmpresa.classList.add('esconder');
    }
    async tomarFoto(espacio: any)
    {
        var h, w;
        if(espacio == 'foto')
        {
            h = 400;
            w = 400;
        }
        else
        {
            h = 1932;
            w = 1237;
        }
        const options: CameraOptions = 
        {
            quality: 30,
            correctOrientation: true,
            //targetHeight: h,
            //targetWidth: w,
            height: h,
            width: w,
            // preserveAspectRatio: true,
            // allowEdit: true,
            resultType: CameraResultType.DataUrl,
            //destinationType: Camera.DestinationType.DATA_URL,
        };
        console.log(options);
        Camera.getPhoto(options)
        .then((imageData) => 
        {
            console.log(imageData.dataUrl);
            console.log("data:image/jpeg;base64," + imageData.dataUrl);
            this.nuevoVisitante[espacio] = imageData.dataUrl;
            console.log(this.nuevoVisitante);
        },
        (err) => {
            console.log(err);
        });
        // console.log(image);
        // this.nuevoVisitante[espacio] = "data:image/jpeg;base64," + image;
    }
    addSignature()
    {
        //const canvas: any = this.elementref.nativeElement.querySelector('canvas');
        //canvas.width = window.innerWidth;
        //canvas.height = 200;
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
        this.signaturePad.clear();
        this.signaturePad.penColor = 'rgb(56,128,255)';
    }
    clearSignature()
    {
        this.signaturePad.clear();
    }
    maximoID(){
        this.ids
    }
    async guardarVisitante()
    {
        this.id = Math.max(...this.ids);
        //this.nuevoVisitante.id = this.id + 1;
        this.nuevoVisitante.firma = this.signaturePad.toDataURL();
        var enviar = 
        {
            visitante: this.nuevoVisitante,
            vehiculo: this.nuevoVehiculo,

        }
        console.log(enviar);
        this.api.saveVisitante(enviar)
        .subscribe(r => 
        {
            this.dismiss(null);
        });
    }
}

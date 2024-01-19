import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EnvService } from '../../services/env.service';
import {finalize} from 'rxjs/operators';
import SignaturePad from 'signature_pad';
const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit 
{
    @ViewChild('canvas', { static: false })
    signaturePadElement!: { nativeElement: HTMLCanvasElement; };
    version: string;
    actualizar: boolean = false;
    loader: any;
    fecha = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    hora = this.datepipe.transform(new Date(), 'HH:mm:ss');
    buscado: boolean = false;
    colaboradores: any;
    search = '';
    empleado: any;
    signaturePad: any;
    seleccionado: any = 1;
    subseleccionado: any = 1;
    tipo: any;
    llave: any = {};
    user: any;
    camiones: any;
    choferes: any;
    registros: any = [];
    constructor
    (
        private env: EnvService,
        private api: ApiService,
        private loading: LoadingController,
        private Activatedroute: ActivatedRoute,
        public datepipe: DatePipe,
        public alertController: AlertController,
        private storage: Storage,
        private elementref: ElementRef
    ) 
    {
        this.version = this.env.Version;
    }

    ngOnInit() 
    {
        console.log(this.fecha);
        this.tipo = 
        [
            {
                id: 1,
                nombre: 'Entrega'
            },
            {
                id: 2,
                nombre: 'Recibe'
            },

        ]
        this.storage.get(TOKEN_KEY).then((r) => 
        {
            this.user = r;
            console.log(this.user);
        });
        this.Activatedroute.paramMap.subscribe((params)=>
        {
            // this.getColaboradores();
            this.api.checkVersion(this.version)
            .subscribe(r => 
            {
                this.actualizar = r.data;
            });
        });
        this.api.getCamiones()
        .subscribe(r => 
        {
            this.camiones = r.data;
            this.api.getChoferes()
            .subscribe(r => 
            {

                this.choferes = r.data;
                this.getRegistrosDia();
            })
        })
    }
    // async getColaboradores()
    // {
    //     await this.presentLoading()
    //     .then()
    //     {
    //         this.api.getColaboradores()
    //         .pipe(finalize(async () =>
    //         {
    //             await this.loader.dismiss();
    //         }))
    //         .subscribe(r => 
    //         {
    //             this.colaboradores = r.data;
    //             this.buscado = true;
    //         })
    //     };
    // }
    async presentLoading()
    {
        this.loader = await this.loading.create(
        {
            message: 'Cargando...'
        });
        await this.loader.present();
    }
    async buscarEmpleado()
    {
        await this.presentLoading()
        .then()
        {
            this.api.getColaborador({palabra: this.search})
            .pipe(finalize(async () =>
            {
                await this.loader.dismiss()
                .then()
                {
                    if(this.empleado)
                    {
                        if(!this.empleado.entrada)
                        {
                            this.addSignature();
                        }
                    }
                }
            }))
            .subscribe(r => 
            {
                this.empleado = r.data;
                this.buscado = true;
            })
        };
    }
    addSignature()
    {
        // const canvas: any = this.elementref.nativeElement.querySelector('canvas');
        // canvas.width = window.innerWidth;
        // canvas.height = 200;
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
        this.signaturePad.clear();
        this.signaturePad.penColor = 'rgb(56,128,255)';
    }
    clearSignature()
    {
        this.signaturePad.clear();
    }
    async registarEntradaSalida()
    {
        if(!this.empleado.entrada)
            this.empleado.firma = this.signaturePad.toDataURL();
        await this.presentLoading()
        .then()
        {
            console.log(this.empleado);
            this.api.registarEntradaSalida(this.empleado)
            .pipe(finalize(async () =>
            {
                await this.loader.dismiss();
            }))
            .subscribe(r => 
            {
                this.mensajeOk();
            })
        }
    }
    async mensajeOk()
    {
        const alert = await this.alertController.create(
        {
            header: 'Registro',
            cssClass: 'custom-alert-class',
            message: 'Se capturo la '+(this.empleado.entrada ? 'salida' : 'entrada')+' de '+this.empleado.nombre,
            buttons:
            [
                {
                    text: 'Ok',
                    role: 'confirm',
                    handler: () => 
                    {
                        this.clearSignature();
                        this.buscado = false;
                        this.empleado = null;
                        this.search = '';
                    }
                }
            ]
        });
        await alert.present();
    }
    setSeleccionado(x: any)
    {
        this.llave = {};
        this.search = '';
        this.buscado = false;
        var element = document.querySelector(".tab"+this.seleccionado);
        element!.classList.remove("active");
        this.seleccionado = x;
        this.subseleccionado = 3;
        this.setClaseActive(x).then()
        {

        }
        
    }
    setSubseleccionado(x: any)
    {
        console.log("aquisxiwwnj");
        this.llave = {};
        var element = document.querySelector(".tab"+this.subseleccionado);
        element!.classList.remove("active");
        this.subseleccionado = x;
        this.setClaseActive(x).then()
        {
            if(x == 4)
            {
                this.addSignature();
                this.llave.fecha = this.fecha;
                this.llave.hora = this.hora;
            }
        }
        
    }
    async setClaseActive(x: any)
    {
        var element2 = document.querySelector(".tab"+x);
        element2!.classList.add("active");
    }
    async registarLlave()
    {
        this.llave.firma = this.signaturePad.toDataURL();
        this.llave.UsuarioID = this.user.id;
        await this.presentLoading()
        .then()
        {
            this.api.registarLlave(this.llave)
            .pipe(finalize(async () =>
            {
                await this.loader.dismiss();
            }))
            .subscribe(r => 
            {
                this.mensajeOk2();
            })
        }
        console.log(this.llave);
    }
    async mensajeOk2()
    {
        const alert = await this.alertController.create(
        {
            header: 'Registro',
            cssClass: 'custom-alert-class',
            message: 'Se capturo el registro de la llave con exito',
            buttons:
            [
                {
                    text: 'Ok',
                    role: 'confirm',
                    handler: () => 
                    {
                        this.llave = {};
                        this.llave.fecha = this.fecha;
                        console.log(this.llave.fecha);
                        this.llave.hora = this.hora;
                        this.clearSignature();
                        this.getRegistrosDia()
                        .then()
                        {
                            this.subseleccionado = 3;
                        }
                    }
                }
            ]
        });
        await alert.present();
    }
    getInfoCamion()
    {
        this.api.getInfoCamion(this.llave.CamionID)
        .subscribe(r => 
        {
            // this.mensajeOk2();
            console.log(r.data);
            this.llave.marca = r.data.marca;
            this.llave.modelo = r.data.modelo;
        })
    }
    async getRegistrosDia()
    {
        this.api.getLlavesDia()
        .subscribe(r => 
        {
            console.log(r.data);
            this.registros = r.data;
        })
    }
}

import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { VisitanteComponent } from './visitante/visitante.component';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
@Component({
    selector: 'app-visitantes-create',
    templateUrl: './visitantes-create.component.html',
    styleUrls: ['./visitantes-create.component.scss'],
})
export class VisitantesCreateComponent implements OnInit 
{
    loader: any;
    visitante: any = {};
    visitantes: any;
    empleados: any;
    tipos: any;
    buscado: boolean = true;
    empleadosOptions: any = {};
    visitantesOptions: any;
    empleadoSeleccionado: any = false;
    visitantesSeleccionado: any = [];
    gafetes: any = [];
    vehiculos: any = [];
    gafetesProveedor: any;
    gafetesClientes: any;
    gafetesVisitantes: any;
    search: any;
    vehiculoFlag: boolean = false;
    constructor
    (
        private api: ApiService,
        private env: EnvService,
        private router: Router,
        private loading: LoadingController,
        public modalController: ModalController,
        public alertController: AlertController,
        private elementref: ElementRef,
        public datepipe: DatePipe
    ) { }

    ngOnInit() 
    {
        this.empleadosOptions =
        {
            header: 'Empleados',
            // subHeader: 'Select your favorite topping',
            message: 'Seleccione al empleado que vino a ver',
            translucent: true,
        };
        this.visitantesOptions =
        {
            header: 'Visitantes',
            translucent: true
        };
        this.getInfo();
    }
    async getInfo()
    {
        await this.presentLoading();
        this.api.getBusquedaVisitantes({})
        .subscribe(r => 
        {
            this.visitantes = r.data;
            console.log(this.visitantes);
            this.api.getTipoVisitantes2()
            .subscribe(r => 
            {
                this.tipos = r.data;
                console.log(this.tipos);
                this.tipos.forEach((e: { id: string | number; }) => 
                {
                    this.api.getGafetesDisponibles({id: e.id})
                    .subscribe(r => 
                    {
                        console.log(r);
                        this.gafetes[e.id] = r.data;
                    })
                });
                this.api.getEmpleados()
                .pipe(finalize(async () =>
                {
                    await this.loader.dismiss();
                }))
                .subscribe(r => 
                {
                    this.empleados = r.data;
                    this.buscado = true;
                    console.log(this.gafetes);
                })
            })
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
    verEmpleado()
    {
        console.log(this.empleadoSeleccionado);
        this.visitante.EmpleadoID = this.empleadoSeleccionado.id
        console.log(this.visitante);
    }
    verVisitante()
    {
        this.vehiculos = [];
        this.vehiculoFlag = false;
        this.visitantesSeleccionado = [];
        this.visitantes.forEach((e: { visto: number; }) => 
        {
            if(e.visto == 1)
                this.visitantesSeleccionado.push(e);
        });
        console.log(this.visitantesSeleccionado);
        this.tipos.forEach((e: { id: string | number; }) => 
        {
            this.api.getGafetesDisponibles({id: e.id})
            .subscribe(r => 
            {
                this.gafetes[e.id] = r.data;
            })
        });
        this.visitantesSeleccionado.forEach((e: { id: any; tipo_visitante: string | number; gafete: any; gafete_nombre: any; }) => 
        {
            var buscado = true;
            this.api.getMisVehiculos({id: e.id})
            .subscribe(r => 
            {
                this.vehiculos.push(r.data);
                console.log(this.vehiculos);
                // e.vehiculos = r.data;
            })
            this.gafetes[e.tipo_visitante].forEach((f: { visitante: boolean | null; id: any; nombre: any; }) => 
            {
                if(f.visitante == null && buscado)
                {
                    buscado = false;
                    f.visitante = true;
                    e.gafete = f.id;
                    e.gafete_nombre = f.nombre;
                }
            });
        });
        //let modalEmpresa = this.elementref.nativeElement.querySelector('div.modal-visitantes');
        //modalEmpresa.classList.add('esconder');
    }
    selectCar(x: any)
    {
        console.log(x);
        this.vehiculos.forEach((e: any[]) => 
        {
            e.forEach((f: { seleccionado: number; }) => 
            {
                f.seleccionado = 0;    
            });    
        });
        x.seleccionado = 1;
        this.vehiculoFlag = true;
        console.log(x);
    }
    async abrirVisitanteAgregar()
    {
        const modal = await this.modalController.create
        ({
            component: VisitanteComponent,
            cssClass: 'custom-visitante',
            componentProps: {}
        });
        modal.onDidDismiss()
        .then((data) => 
        {
            this.ngOnInit();
        });
        return await modal.present();
    }
    async guardarVisita()
    {
        await this.presentLoading();
        var vehiculo;
        this.vehiculos.forEach((e: any[]) => 
        {
            e.forEach((f: { seleccionado: number; }) => 
            {
                if(f.seleccionado == 1)
                    vehiculo = f;    
            });    
        });
        var enviar = 
        {
            empleado: this.empleadoSeleccionado,
            visitantes: this.visitantesSeleccionado,
            vehiculo: vehiculo
        }
        console.log(enviar);
        this.api.saveVisita(enviar)
        .pipe(finalize(async () =>
        {
            await this.loader.dismiss();
        }))
        .subscribe(r => 
        {
            this.router.navigate(['/visitantes-index']);
        })
    }
    verVisitantes()
    {
        let modalEmpresa = this.elementref.nativeElement.querySelector('div.modal-visitantes');
        modalEmpresa.classList.remove('esconder');
    }
    cancelarVisitantes()
    {
        this.visitantes.forEach((e: { visto: number; }) => 
            {
                e.visto = 0;
            });
        //let modalEmpresa = this.elementref.nativeElement.querySelector('div.modal-visitantes');
        //modalEmpresa.classList.add('esconder');
    }
}

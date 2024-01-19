import { Component, OnInit } from '@angular/core';
import { LuDatePipe } from '../../../pipes/luDate.pipe'
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { InspeccionSalidaComponent } from '../modals/inspeccion-salida/inspeccion-salida.component';
import { FirmaComponent } from '../modals/firma/firma.component';

@Component({
  selector: 'app-itinerarios-view',
  templateUrl: './itinerarios-view.component.html',
  styleUrls: ['./itinerarios-view.component.scss']
})
export class ItinerariosViewComponent implements OnInit{
  contenedor: any;
  itinerario!: {};
  fechas: any;
  equipmentProvider: any;
  choferes: any;
  id: any;
  ctpad: any;
  rutas: any;
  nuevo: any;
  puntos = false;
  estadosContenedor = 
    [
        {
            id: 0,
            nombre: 'Vacio'
        },
        {
            id: 1,
            nombre: 'Cargado'
        }
    ];

  constructor(
    private api: ApiService,
    public modalController: ModalController,
  ){}

  ngOnInit() {
    this.getClientes();
    this.contenedor = JSON.parse(localStorage.getItem('itinerarioActual') ?? 'null') || null;
    console.log(this.contenedor);
    
    this.getChoferes();
    this.getPuntosCTPADSalida();
    this.getRutasCliente();
  }

  getClientes(){
    this.api.getClientes()
    .subscribe(r =>{
      this.equipmentProvider =  r.data.clientes2;
      console.log(this.equipmentProvider);
    })
  }

  getChoferes(){
    this.api.getChoferesPatios()
    .subscribe(r => {
      this.choferes = r.data;
    })
    this.contenedor.FechaEvento = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
    this.id = this.contenedor.InventarioID;
    console.log(this.contenedor);
    this.contenedor.Firmak9 = null;
  }

  getPuntosCTPADSalida(){
    this.api.getPuntosCTPADSalida(this.id)
    .subscribe(r =>{
      console.log(r);
      this.ctpad = r.data;
    })
  }

  getRutasCliente(){
    this.api.getRutasCliente(this.contenedor.ClienteID)
    .subscribe(r =>{
      this.rutas = r.data;
      this.rutas.unshift({ id: 0, nombre: 'N/A' });
      console.log(r);
    })
  }


  
  async revision()
    {
        const modal = await this.modalController.create
        ({
            component: InspeccionSalidaComponent,
            cssClass: 'custom-visitante',
            componentProps: {
              data: this.ctpad
            }
        });
        modal.onDidDismiss()
        .then((data) => 
        {
          console.log(data);
            //this.ngOnInit();
        });
        this.puntos = true;
        return await modal.present();
        
    }
  async firma(){
    const modal = await this.modalController.create
        ({
            component: FirmaComponent,
            cssClass: 'custom-visitante',
            componentProps: {
              data: this.contenedor
            }
        });
        modal.onDidDismiss()
        .then((data) => 
        {
          console.log(data);
          this.contenedor = data.data.data
            //this.ngOnInit();
        });
        return await modal.present()
  }
  salidaContenedor(){
    console.log(this.ctpad);
    console.log(this.contenedor);
    this.api.saveSalidaContenedor(this.ctpad, this.contenedor)
    .subscribe(r =>{
      console.log("Se cargó");
      window.history.back();
    }
      
    )

  }
  
}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LuDatePipe } from "../pipes/luDate.pipe";

import { FirmaComponent } from './modals/firma/firma.component';


interface Moneda {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-diesel-form',
  templateUrl: './diesel-form.component.html',
  styleUrls: ['./diesel-form.component.scss']
})
export class DieselFormComponent implements OnInit {
  ChoferID:any;
  mostrar=false;
  loader: any;
  camiones: any = [];
  search?: any = '';
  camion: any;
  titulo: any;
  camionSeleccionado: any;
  historial:  any = {};
  getHistorial: any =[];
  id: any;
  photo?: any;
  rutasMillas: number = 0;
  odometroAnterior: any;
  ultimoHistorial: any;
  proveedoresList: any[] =[];
  carga: any = {
    ProveedorID: null, // Inicializa ProveedorID con un valor predeterminado, en este caso, null.
    PrecioTotal: null,
    MonedaCarga: null,
    Litros: null,
    FotoTanque1:null,
    FotoTanque2:null,
    Folio: null,
    tickets: [],
    Nota: null,
    SerieBomba: null,
    OdometroCarga: null,
    FotoOdometro: null,
    RendimientoECM: null,
    RecorridoECM: null,
    LitrosECM: null,
    Sellos: null,
    FotoSello: null,
    Firma: null,
    ChoferID: null

  };
  monedas: Moneda[] = [
    {
      id: 0,
      nombre: 'MXN'
    },
    {
      id: 1,
      nombre: 'USD'
    }
  ];

  constructor(
    private api: ApiService,
    private loading: LoadingController,
    public modalController: ModalController,
    private Activatedroute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCamionesTabla();
    this.proveedoresGet();
    this.setFechaHoraActual();

  }

  setFechaHoraActual() {
    const fechaHoraActual = new Date();
    this.carga.Fecha = this.formatoFecha(fechaHoraActual);
    this.carga.Hora = this.formatoHora(fechaHoraActual);
  }

  formatoFecha(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fecha.toLocaleDateString('es-MX', options);
  }

  formatoHora(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return fecha.toLocaleTimeString('es-MX', options);
  }

  proveedoresGet() {
    //await this.presentLoading();
    this.api.getProveedores()
      .pipe(

    )
      .subscribe((r: any) => {
        this.proveedoresList = r.data;
      });
  }


  async getCamionesTabla() {
    await this.presentLoading();
    this.api.getCamionesTabla()
      .pipe(
        finalize(async () => {
          await this.loader.dismiss();
        })
      )
      .subscribe(
        (response: any) => {
          this.camiones = response.data;
          //console.log(this.camiones);

          this.Activatedroute.paramMap.subscribe(params => {
            this.id = Number(params.get('id'));
            this.camionSeleccionado = this.camiones.find((camion: { id: number }) => camion.id === this.id);
            console.log(this.camionSeleccionado);
            console.log(this.id);

            this.getCamionById();
            this.getUltimoHistorial();
          });
        },
        (error) => {
          console.error('Error al obtener los datos de la API:', error);
        }
      );
  }

  async getCamionById() {
    //await this.proveedoresGet();
    this.api.getCamion(this.id)
      .pipe(
        finalize(async () => {
          await this.loader.dismiss();
        })
      )
      .subscribe(
        (data: any) => {
          //this.camionSeleccionado = data.camion;
          console.log(this.getHistorial);
          this.getHistorial = data.data.historial;
          this.ChoferID = data.data.choferes;

          console.log("choferes ", this.ChoferID);
          console.log("pruebaaaaa: ", this.getHistorial);
          this.loader.dismiss();
        },
        (error) => {
          console.error('Error al obtener datos del camión:', error);
          this.loader.dismiss();
        }
      );
  }

  getUltimoHistorial() {
    //await this.presentLoading();
    const fechaHoraActual = new Date();
    console.log("Despues de la fecha de new Date");
    const fechaHoraFormateada = fechaHoraActual.toISOString(); // Formato ISO 8601
    console.log("Despues del fechaHoraActual.toISOString");

    this.historial.CamionID = this.id;
    this.historial.FechaActual = fechaHoraFormateada;

    // Construir los parámetros de la URL
    /*let data = new HttpParams();
    data = data.append('CamionID', Number(this.id));
    data = data.append('FechaActual', fechaHoraFormateada);*/
    
    console.log("id del camion antes de hacer la llamada api getULtimoHsitorial: ", this.id);
    console.log(fechaHoraFormateada);
    console.log(this.historial);


    this.api.getHistorialAnterior(this.historial)
      .pipe(

    )
      .subscribe(
        (data: any) => {
          //this.loader.dismiss();
          console.log('Fecha, hora y camión enviados con éxito al backend:', data);
          this.ultimoHistorial = data.data.itinerarios; // Asigna el valor recibido a la variable ultimoHistorial
          console.log("este es el array: ", this.ultimoHistorial);
        },
        (error) => {
          this.loader.dismiss();
          console.error('Error al enviar la fecha, hora y camión al backend:', error);
        }
      );
  }

  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }

  async agregarFirma(){
    console.log('Valor de Sellos:', this.carga.Sellos);
    const modal = await this.modalController.create({
      component: FirmaComponent,
      cssClass: 'my-custom-class',
      componentProps: 
      {
        //id: this.seleccionado.id,
        carga: this.carga,
        ChoferID: this.ChoferID
        
      }
    });
    modal.onDidDismiss()
    .then((data) => 
    {
      this.showAlert();
      /*console.log(data.data.data);
      if(data.data.data)
        this.evidenciasAdicionales.push(data.data.data);*/
    });
    return await modal.present();
  }

  
  showAlert() {
    this.mostrar=true;
    setTimeout(() => {
      this.mostrar=false;
    }, 2000);
  }

  tomarFoto(campo: string) {
    const options = {
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      width: 400,
      height: 533,
      saveToGallery: false,
      correctOrientation: true,
    };

    Camera.getPhoto(options)
      .then(imageData => {
        console.log("tomar foto");
        const image = imageData.dataUrl;
        this.carga[campo] = image;
        console.log(this.carga);
      })
      .catch(error => {
        console.error('Error al tomar la foto:', error);
      });
  }

  tomarFotoTicket() {
    const options = {
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      width: 400,
      height: 533,
      saveToGallery: false,
      correctOrientation: true,
    };

    Camera.getPhoto(options)
      .then(imageData => {
        console.log("tomar foto");
        const image = imageData.dataUrl;
        console.log(image);
        this.carga.tickets.push(image);
        console.log(this.carga);
      })
      .catch(error => {
        console.error('Error al tomar la foto:', error);
      });
  }
}


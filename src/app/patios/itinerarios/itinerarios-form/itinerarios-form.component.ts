import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LuDatePipe } from '../../../pipes/luDate.pipe';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import SignaturePad from 'signature_pad';
import { ModalController } from '@ionic/angular';
//import { FirmaFormComponent } from '../modals/firma/firma-form.component';
import { FirmaFormComponent } from "../modals/firma-form/firma-form.component";
import { Camera, CameraResultType, CameraOptions } from '@capacitor/camera';
import { InspeccionSalidaComponent } from '../modals/inspeccion-salida/inspeccion-salida.component';
import { FirmaComponent } from '../modals/firma/firma.component';
import { InspeccionComponent } from '../modals/inspeccion/inspeccion.component';
import { Storage } from '@ionic/storage';
import { ContenedoresComponent } from '../modals/contenedores/contenedores.component';
const TOKEN_KEY = 'auth-token';
import * as bootstrap from 'bootstrap';
import { NotificationService } from "../../../services/notificacion.service";


@Component({
  selector: 'app-itinerarios-form',
  templateUrl: './itinerarios-form.component.html',
  styleUrls: ['./itinerarios-form.component.scss']
})
export class ItinerariosFormComponent implements OnInit {
  public Tokenkey: string = TOKEN_KEY;
  contenedor: any = {
    Botando: false,
    FechaEvento: formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
  };
  switchValue: any = 1;
  opcion: any = 1;
  puntos: any;
  flag: any = false;
  nuevo: any;
  sizes: any;
  billto: any;
  equipmentProvider: any;
  choferes: any;
  camiones: any;
  ctpad: any;
  contenedores: any;
  //signaturePad2: any;
  //signaturePad3: any;
  //signaturePad: any;
  signaturePad: SignaturePad | undefined;
  rutas: any;
  estados: any;
  checkIns: any;
  data: any;
  paises =
    [
      {
        id: 1,
        nombre: 'México'
      },
      {
        id: 2,
        nombre: 'Estados unidos'
      }
    ];
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
    private storage: Storage,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSizes();
    this.getClientes();
    this.getChoferesPatios();
    this.getCamiones();
    this.getPuntosCTPAD();
    /*// Verificar si el navegador admite notificaciones
    if ("Notification" in window) {
      // Comprobar si las notificaciones están permitidas
      if (Notification.permission === "granted") {
        // Si las notificaciones están permitidas, muestra una notificación
        const notification = new Notification("¡Hola mundo!", {
          body: "Este es un ejemplo de notificación sencilla.",
          icon: "icono.png" // Reemplaza con la URL de tu propio ícono
        });

        // Puedes agregar eventos de clic, cierre, etc., a la notificación si lo deseas
        notification.onclick = function () {
          // Acción a realizar al hacer clic en la notificación
        };

        notification.onclose = function () {
          // Acción a realizar cuando se cierra la notificación
        };
      } else if (Notification.permission !== "denied") {
        // Si las notificaciones no están permitidas ni denegadas, solicita permiso al usuario
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            // Permiso concedido, puedes mostrar una notificación
          }
        });
      }
    }*/
    //this.showSuccess();
    

  }
  noti(){
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample!)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }
  }

  showSuccess() {
    console.log("aaaa");
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  getSizes() {
    this.api.getSizes()
      .subscribe(r => {
        this.sizes = r.data;
        console.log(r);
      })
  }

  getClientes() {
    this.api.getClientes()
      .subscribe(r => {
        this.billto = r.data.clientes1;
        this.equipmentProvider = r.data.clientes2;
        console.log(r);
      })
  }

  getChoferesPatios() {
    this.api.getChoferesPatios()
      .subscribe(r => {
        this.choferes = r.data;
        console.log(r);
      })
  }

  getCamiones() {
    this.api.getCamionesPatios()
      .subscribe(r => {
        this.camiones = r.data;
        console.log(r);
      })
  }

  getPuntosCTPAD() {
    this.api.getPuntosCTPAD(null)
      .subscribe(r => {
        this.ctpad = r.data;
        console.log(r);
      })
  }

  onSwitchChange() {
    if (this.switchValue == 1) {
      this.switchValue = 2; // Cambiar a 2 cuando se desactiva
      this.opcion = 2;
    } else {
      this.switchValue = 1; // Cambiar a 1 cuando se activa
      this.opcion = 1;
    }
    console.log(this.switchValue);
  }

  buscarContenedor(camion: any) {
    console.log(this.contenedor);
    this.puntos = false;
    var contenedor = camion ? camion : this.contenedor.Contenedor;
    var data =
    {
      contenedor: contenedor,
      WContID: this.contenedor.WContenedorID,
      tipo: this.opcion
    };
    this.api.getContenedorEntrada(data)
      .subscribe(async r => {
        console.log(r);
        var fecha = this.contenedor.FechaEvento;
        var contenedor = camion ? '' : this.contenedor.Contenedor;
        console.log(contenedor);
        this.flag = true;
        if (r.data == 5) {
          //this.contenedor = {};
          this.flag = false;
          console.log('Contenedor ya en Patio Alert');
          /*var alertPopup = $ionicPopup.alert(
          {
              title: 'Contenedor ya en patio',
              template: 'Este contenedor ya se encuentra en el patio. Favor de buscar otro.'
          });
          alertPopup.then(function(res) {
              console.log(res, 'error con foto');
          });*/
        } else {
          if (r.data == 15) {
            //this.contenedor = {};
            this.contenedor.Contenedor = contenedor;
            this.contenedor.WContenedorID = 0;
            this.contenedor.ChoferID = 0;
            this.contenedor.UsuarioID = 0;
            this.contenedor.Botando = false;
            this.nuevo = true;
            this.api.getPuntosCTPAD(null)
              .subscribe(r => {
                this.ctpad = r.data;
                console.log(r);
                console.log(this.contenedor);
                this.toastr.warning('No se encontro ningun contenedor', '');
                console.log("Alerta No se encontro ningun contenedor")
                //this.firmas();
              })
          }
          else {
            this.contenedores = r.data;
            if (this.contenedores.length == 1) {
              console.log(this.contenedores[0]);
              this.contenedor = this.contenedores[0];
              this.contenedor.Botando = false;
              console.log(this.contenedor);
              this.api.getPuntosCTPAD(this.contenedor.ItinerarioID)
                .subscribe(r => {
                  this.ctpad = r.data;
                  this.nuevo = false;
                  //this.firmas();
                })
            }
            else {
              const modal = await this.modalController.create
                ({
                  component: ContenedoresComponent,
                  cssClass: 'custom-visitante',
                  componentProps: {
                    data: this.contenedor
                  }
                });
              modal.onDidDismiss()
                .then((data) => {
                  console.log(data);
                  this.nuevo = false;
                  //console.log(data.data.data);
                  //this.ngOnInit();
                });
              return await modal.present()
            }
          }
        }
        this.contenedor.FechaEvento = fecha;
      })
  }


  clearCanvas2() {
    this.signaturePad!.clear();
  }
  clearCanvas3() {
    this.signaturePad!.clear();
  }

  saveCanvas2() {
    this.contenedor.FirmaGuardia = this.signaturePad!.toDataURL();
    console.log(this.contenedor);
  }

  saveCanvas3() {
    this.contenedor.FirmaChofer = this.signaturePad!.toDataURL();
    console.log(this.contenedor);
  }

  botando() {
    if (this.flag == true)
      this.flag = false;
    else {
      this.flag = true;
      this.contenedor.TipoEvento = 1;
    }
  }

  changeCliente() {
    //this.rutas = [];
    console.log("sddsds", this.contenedor.ClienteID);
    this.api.getRutasCliente(this.contenedor.ClienteID)
      .subscribe(r => {
        console.log(r);
        this.rutas = r.data;
      });
  }

  getEstados() {
    console.log(this.contenedor.paisID);
    this.api.getEstados(this.contenedor.PaisID)
      .subscribe(r => {
        console.log(r);
        this.estados = r.data;
      })
  }

  tomarFotoSello() {
    const options: CameraOptions = {
      quality: 75,
      correctOrientation: true,
      //targetHeight: h,
      //targetWidth: w,
      height: 400,
      width: 400,
      // preserveAspectRatio: true,
      // allowEdit: true,
      resultType: CameraResultType.DataUrl,

    };
    Camera.getPhoto(options)
      .then((imageData) => {
        console.log(imageData.dataUrl);
        console.log("data:image/jpeg;base64," + imageData.dataUrl);
        this.contenedor.FotoSello = imageData.dataUrl;
        //this.ctpad.FotoSalida = x.FotoSalida;
        //this.ctpad[x] =imageData.dataUrl;
        console.log(this.contenedor);
      },
        (err) => {
          console.log(err);
        });
  }

  async abrirFirma() {
    const modal = await this.modalController.create
      ({
        component: FirmaFormComponent,
        cssClass: 'custom-visitante',
        componentProps: {
          data: this.contenedor
        }
      });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        console.log(data.data.data);
        //this.ngOnInit();
      });
    return await modal.present()
  }
  async revision() {
    const modal = await this.modalController.create
      ({
        component: InspeccionComponent,
        cssClass: 'custom-visitante',
        componentProps: {
          data: this.ctpad
        }
      });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        //this.ngOnInit();
      });
    this.puntos = true;
    return await modal.present();
  }
  async firma() {
    const modal = await this.modalController.create
      ({
        component: FirmaComponent,
        cssClass: 'custom-visitante',
        componentProps: {
          data: this.contenedor
        }
      });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.contenedor = data.data.data
        //this.ngOnInit();
      });
    return await modal.present()
  }

  guardarContenedor() {
    this.storage.get(TOKEN_KEY).then((r) => {
      this.data = r;
      console.log(this.data);
      this.contenedor.UsuarioEventoID = this.data.UsuarioID;
      this.contenedor.PatioID = this.data.PatioID;
      //this.contenedor.UsuarioEventoID = this.data.
    })

    var data =
    {
      contenedor: this.contenedor,
      puntos: this.ctpad
    };
    console.log(data);
    
    this.api.saveContenedorEntrada(data).
      subscribe(r => {
        this.toastr.success('Se guardo con exito', 'Exito');
        console.log("Se guardo");
      })

  }

}

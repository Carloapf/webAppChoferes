import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import SignaturePad from 'signature_pad';


import { Camera } from '@capacitor/camera';
const { } = Plugins;
@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss'],
})
export class FirmaComponent implements OnInit {
  @ViewChild('signatureCanvas', { static: true })
  signatureCanvas!: ElementRef;
  signaturePad!: SignaturePad;
  @Input() carga: any;
  @Input() ChoferID: any;
  loader: any;
  mostrar = false;
  guardar = false;


  //toastController: any;
  //carga: any;
  constructor
    (
      private api: ApiService,
      public modalController: ModalController,
      public alertController: AlertController,
      private loading: LoadingController,
      private toastController: ToastController
    ) {
  }


  ngOnInit() {
    this.initializeSignaturePad();
    /*this.fotos = 
    {
      EvidenciaID: this.id,
      ItinerarioID: this.ItinerarioID,
      nombre: this.nombre,
      fotos: [],
      index: 0
    }
    console.log(this.fotos);*/
    // this.options = {
    //   quality: 75,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
  }
  initializeSignaturePad() {
    const canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas);
  }

  clearCanvas() {
    this.signaturePad.clear();
  }

  async saveCanvas() {
    if (this.signaturePad.isEmpty()) {
      const toast = await this.toastController.create({
        message: 'Firma requerida',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    } else {
      if (this.carga.ChoferID == null) {
        const toast = await this.toastController.create({
          message: 'Nombre requerido',
          duration: 2000,
          position: 'bottom',
          color: 'danger',
        });
        toast.present();
      } else {
        const firma = this.signaturePad.toDataURL().replace(/(\r\n|\n|\r)/gm, '');
    
        this.carga.Firma = firma;
        //console.log('Firma guardada:', this.carga.Firma);
        this.guardarCarga();
        //console.log("Datos guardados: ", this.carga);
        const guardar= true;
       

        // Cerrar el modal y enviar la firma como resultado
        this.modalController.dismiss({ firma, guardar });
      }

    }
  }

  async guardarCarga() {
    try {
      await this.presentLoading();
      //console.log("carga antes de ser enviada: ", this.carga);
      this.api.saveCarga(this.carga)
        .pipe(finalize(async () => {
          await this.loader.dismiss();
        }))
        .subscribe(
          r => {
            //console.log("Se guardo la cargaaaaa");
            this.showAlert();
            /*
            setTimeout(() => {
              this.sendReport();
            }, 0);
            */
          },
          error => {
            //console.error("Error al guardar la carga:", error);
            // Aquí puedes realizar acciones adicionales en caso de error, como mostrar un mensaje de error.
          }
        );
    } catch (error) {
      //console.error("Error al guardar la carga:", error);
      // Aquí también puedes realizar acciones adicionales en caso de error, como mostrar un mensaje de error.
    }
  }



  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      //data: data
    });
  }

  showAlert() {
    this.mostrar = true;
  }
  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }


}

defineCustomElements(window);
import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { Camera } from '@capacitor/camera';
const {  } = Plugins;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit 
{
  @Input() id: any;
  @Input() nombre: string | undefined;
  @Input() ItinerarioID: any;
  options: any = {};
  fotos: any = {};
  loader: any;
  constructor
  (
    private api: ApiService,
    public modalController: ModalController,
    public alertController: AlertController,
    private loading: LoadingController
  ) 
  { 
  }
  
  
  ngOnInit()
  {
    this.fotos = 
    {
      EvidenciaID: this.id,
      ItinerarioID: this.ItinerarioID,
      nombre: this.nombre,
      fotos: [],
      index: 0
    }
    console.log(this.fotos);
    // this.options = {
    //   quality: 75,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      //data: data
    });
  }
  async tomarFoto()
  {
    const image = await Camera.getPhoto({
      quality: 10,
      correctOrientation: true,
      //width: 576,
      //height: 1024,
      //preserveAspectRatio: true,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    console.log(image);
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  
    // Can be set to the src of an image now
    this.fotos.fotos.push(image.dataUrl);
    console.log(this.fotos);
  }
  async terminarFotos()
  {
    const alert =  await this.alertController.create(
      {
        cssClass: 'my-custom-class',
        header: 'Terminar',
        message: '¿Seguro que desea terminar? Se guardará la evidencia.',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Aceptar',
            handler: () => 
            {
              this.guardarEvidencias();
            }
          }
        ]
      });
      await alert.present();
  }
  async guardarEvidencias()
  {
    await this.presentLoading();
    this.api.createPdf(this.fotos)
    .pipe(finalize(async () => {
      await this.loader.dismiss();
    }))
    .subscribe(r => 
    {
      this.dismiss();
    });
  }
  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }
  
}

defineCustomElements(window);
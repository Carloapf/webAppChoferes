import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import SignaturePad from 'signature_pad';

import { Camera } from '@capacitor/camera';
const {  } = Plugins;
@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss'],
})
export class FirmaComponent implements OnInit 
{
  @ViewChild('signatureCanvas', { static: true })
  signatureCanvas!: ElementRef;
  signaturePad!: SignaturePad;
  @Input() carga: any;
  
  choferes =[];
  //toastController: any;
  //carga: any;
  constructor
  (
    private api: ApiService,
    public modalController: ModalController,
    public alertController: AlertController,
    private loading: LoadingController,
    private toastController: ToastController
  ) 
  { 
  }
  
  
  ngOnInit()
  {
    console.log(this.carga);
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
      const firma = this.signaturePad.toDataURL().replace(/(\r\n|\n|\r)/gm, '');
      // Aquí puedes hacer lo que necesites con la firma, por ejemplo, enviarla al servidor
      console.log('Firma guardada:', firma);

      // Cerrar el modal y enviar la firma como resultado
      this.modalController.dismiss({ firma });
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
  
  
}

defineCustomElements(window);
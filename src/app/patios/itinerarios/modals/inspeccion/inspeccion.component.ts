import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraOptions } from '@capacitor/camera';

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.scss']
})
export class InspeccionComponent implements OnInit {
  @Input() data: any;
  ctpad: any

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit(): void {
    this.ctpad = this.data;
    console.log(this.ctpad);
  }

  checkEntrada(x: any) {
    x.Entrada = x.Entrada ? 0 : 1;
    if (x.Entrada) {
      x.ComentarioEntrada = null;
      x.FotoEntrada = null;
    }
    console.log(x);
  }
  fotoRevisionEntrada(x: any){
    const options: CameraOptions = 
        {
            quality: 30,
            correctOrientation: true,
            //targetHeight: h,
            //targetWidth: w,
            height: 400,
            width: 400,
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
            x.FotoEntrada = imageData.dataUrl;
            //this.ctpad.FotoSalida = x.FotoSalida;
            //this.ctpad[x] =imageData.dataUrl;
            console.log(this.ctpad);
        },
        (err) => {
            console.log(err);
        });
  }

  dismiss(data= this.ctpad) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      data: data
    });
  };
}

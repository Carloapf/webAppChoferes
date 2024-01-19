import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType, CameraOptions } from '@capacitor/camera';


@Component({
  selector: 'app-inspeccion-salida.html',
  templateUrl: './inspeccion-salida.component.html',
  styleUrls: ['./inspeccion-salida.component.scss']
})
export class InspeccionSalidaComponent implements OnInit {

  notas: any;
  @Input() data: any;
  ctpad: any;

  constructor(
    private api: ApiService,
    public modalController: ModalController,
  ) { }

  ngOnInit(): void {
    this.ctpad = this.data;
    console.log(this.ctpad);
  }

  notaRevisionSalida(x: any) {
    if (x.Salida == false) {
      console.log("abrir dialog");
    }
    else {
      x.comentariosalida = null;
      console.log(x);
    }
  }

  fotoRevisionSalida(x: any){
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
            x.fotosalida = imageData.dataUrl;
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
  checkSalida(x: any) {
    x.Salida = x.Salida ? 0 : true;
    if (x.Salida) {
      x.comentariosalida = null;
      x.fotosalida = null;
    }
    console.log(x);
  }


}

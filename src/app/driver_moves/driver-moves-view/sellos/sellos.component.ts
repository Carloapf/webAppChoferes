import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
const { Camera } = Plugins;
const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-sellos',
  templateUrl: './sellos.component.html',
  styleUrls: ['./sellos.component.scss'],
})
export class SellosPage implements OnInit {
  id : any;
  loader: any;
  sello: any;
  sellos: any = [];
  foto: any;
  data: any;
  comentario: any;
  image: any;
  rotoExt: any = [];
  constructor(
    private Activatedroute: ActivatedRoute,
    private loading: LoadingController,
    private api: ApiService,
    private storage: Storage,
    public alertController: AlertController,
    public datepipe: DatePipe
  )
  { 
    this.Activatedroute.paramMap.subscribe(params => 
    { 
      this.id = params.get('id'); 
    });
  }

  ngOnInit() 
  {
    this.getImagesExt()
  }
  async getImagesExt()
  {
    await this.presentLoading();
    this.storage.get(TOKEN_KEY).then((r) => 
    {
      this.data = 
      {
        tipo: 1,
        itinerario: this.id,
        chofer:  r.id
      }
      console.log(this.data);
      this.api.getImagenesExt(this.data)
      .pipe(finalize(async () => 
      {
        await this.loader.dismiss();
      }))
      .subscribe(r => 
      {
        this.sellos = r.data;
        this.sellos.forEach((e: { id: string | number; roto: any; }) => {
          this.rotoExt[e.id] = e.roto;
        });
        console.log(this.sellos);
      })
    })
  }
  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }
  async subirSello()
  {
    if(this.sello != '')
    {
      this.storage.get(TOKEN_KEY).then((r) => 
      {
        this.foto = 
        {
          sello: this.sello,
          itinerario: this.id,
          chofer:  r.id
        }
        this.tomarFoto();
      })
    }
  }
  async tomarFoto()
  {
    this.image = await Camera['getPhoto']({
      quality: 75,
      correctOrientation: true,
      width: 576,
      height: 1024,
      preserveAspectRatio: true,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    var element = document.getElementById("block");
    if (element !== null) {
      element.classList.toggle("no");
    }
    //element.classList.toggle("no");
  }
  async confirmacion(flag: any)
  {
    if(flag)
    {
      this.foto.FotoSello = this.image.dataUrl;
      this.foto.nota = this.comentario;
      var element = document.getElementById("block");
      if (element !== null) {
        element.classList.toggle("no");
      }
      //element.classList.toggle("no");
      console.log(this.foto);
      await this.presentLoading();
      this.api.insertItinerarioExt(this.foto)
      .pipe(finalize(async () => 
      {
        await this.loader.dismiss();
      }))
      .subscribe(r => 
      {
        this.sello = '';
        this.comentario = '';
        this.sellos.push(r.data[0]);
      })
    }
    else
    {
      var element = document.getElementById("block");
      if (element !== null) {
        element.classList.toggle("no");
      }
      //element.classList.toggle("no");
    }
    
  }
  romperSelloExt(x: any)
  {
    this.data.sello = x.id;
    this.data.roto = true;
    if(this.rotoExt[x.id])
    {
      console.log('se rompio', this.data);
      this.confirmarRomperSello(x);
    }
    else
    {
      console.log('ya esta roto', this.data);
      this.meensajeSelloRoto(x);
    }
    console.log(this.rotoExt[x.id]);
  }
  async confirmarRomperSello(x: { id: any; roto: any; }) {
    console.log(this.rotoExt);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: '¿Desea marcar el sello como roto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => 
          {
            this.rotoExt[x.id] = false;
            x.roto = false;
          }
        }, {
          text: 'Si',
          cssClass: 'terteary',
          handler: () => 
          {
            
            this.confirmarRomperSelloExt(x);
          }
        }
      ]
    });
    await alert.present();
  }
  async meensajeSelloRoto(x: { id: any; roto?: any; }) {
    console.log(this.rotoExt);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Este sello ya esta roto',
      buttons: [
        {
          text: 'Ok',
          handler: () => 
          {
            this.rotoExt[x.id] = true;
            x.roto = true;
          }
        }
      ]
    });
    await alert.present();
  }
  async confirmarRomperSelloExt(x: { id: any; roto: any; })
  {
    await this.presentLoading();
    this.data.FechaRoto = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.api.romperSelloExt(this.data)
    .pipe(finalize(async () => 
    {
      await this.loader.dismiss();
    }))
    .subscribe(r => 
    {
      if(r.data)
      {
        this.selloRoto();
        this.rotoExt[x.id] = true;
        x.roto = true;
      }
    })
  }
  async selloRoto()
  {
    const alert = await this.alertController.create(
    {
      header: '',
      message: 'El sello ha sido marcado como roto',
      buttons: [
        {
          text: 'Ok',
          handler: () => 
          {
          }
        }
      ]
    });
    await alert.present();
  }
}

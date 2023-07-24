import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-driver-moves-view',
  templateUrl: './driver-moves-view.component.html',
  styleUrls: ['./driver-moves-view.component.scss'],
})
export class DriverMovesViewPage implements OnInit {
  id : any;
  loader: any;
  itinerario: any = {};
  fecha: any;
  constructor
  (
    private api: ApiService,
    private loading: LoadingController,
    private router: Router,
    private Activatedroute: ActivatedRoute,
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
    this.getViaje();
  }

  async getViaje()
  {
    await this.presentLoading();
    console.log(this.id);
    this.api.getItinerario(this.id)
    .pipe(finalize(async () => {
      await this.loader.dismiss();
    }))
    .subscribe(r => 
    {
      this.itinerario = r.data;
      console.log("aaaaaa");
      console.log(this.itinerario);
    })
  };
  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }
  inspeccion()
  {
    this.router.navigate(['driver-moves-view/'+this.id+'/inspeccion']);
  }
  evidencias()
  {
    this.router.navigate(['driver-moves-view/'+this.id+'/evidencias']);
  }
  sellos()
  {
    this.router.navigate(['driver-moves-view/'+this.id+'/sellos']);
  }
  reportes()
  {
    this.router.navigate(['driver-moves-view/'+this.id+'/reportes']);
  }
  async fechaLlegada()
  {
    this.fecha = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log(this.fecha);
    const alert =  await this.alertController.create(
    {
      cssClass: 'my-custom-class',
      header: 'Fecha de llegada',
      message: this.fecha,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => 
          {
          }
        },
        {
          text: 'Aceptar',
          handler: () => 
          {
            this.aceptarFecha();
          }
        }
      ]
    });
    await alert.present();
  }
  async aceptarFecha()
  {
    await this.presentLoading();
    var data = 
    {
      ItinerarioID: this.id,
      WcontFK: this.itinerario.WcontFK,
      FechaLlegada: this.fecha
    };
    console.log(data);
    this.api.terminarViaje(data)
    .pipe(finalize(async () => {
      await this.loader.dismiss();
    }))
    .subscribe(r => 
    {
      this.terminadoViaje();
    });
  }
  async terminadoViaje()
  {
    const alert =  await this.alertController.create(
      {
        cssClass: 'my-custom-class',
        header: '',
        message: 'Fecha guardada',
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

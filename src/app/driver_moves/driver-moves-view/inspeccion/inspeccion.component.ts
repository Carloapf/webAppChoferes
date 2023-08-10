import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.scss'],
})
export class InspeccionPage implements OnInit {
  id : any;
  loader: any;
  inspecciones: any = [];
  constructor
  (
    private api: ApiService,
    private loading: LoadingController,
    private Activatedroute: ActivatedRoute
  ) 
  {
    this.Activatedroute.paramMap.subscribe(params => 
    { 
      this.id = params.get('id'); 
    });
  }

  ngOnInit() 
  {
    this.getInspeccion()
  }
  async getInspeccion()
  {
    await this.presentLoading();
    this.api.getInspeccion(this.id)
    .pipe(finalize(async () => {
      await this.loader.dismiss();
    }))
    .subscribe(r => 
    {
      this.inspecciones = r.data;
      this.inspecciones.forEach(function (e: any) 
      {
        if (e.Bien == 1)
          e.Bien = true;

        else
          e.Bien = false;
      });
      //console.log(this.inspecciones);
    })
  }
  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }
  inspeccionChange(data: any)
  {
    if(data.check == true)
      data.check = false;
    else
      data.check = true;
    this.api.changeInspeccion(data)
    .pipe(finalize(async () => {
      
    }))
    .subscribe(r => 
    {
      //console.log(r);
    })
  }
}

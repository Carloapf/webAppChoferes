import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.component.html',
  styleUrls: ['./evidencias.component.scss'],
})
export class EvidenciasPage implements OnInit {
  id: any;
  loader: any;
  tipoEvidencias: any = [];
  evidenciasRequeridas: any;
  evidenciasAdicionales: any = [];
  cargado: any = false;
  seleccionado: any;
  constructor
  (
    private api: ApiService,
    private loading: LoadingController,
    public modalController: ModalController,
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
    this.getEvidencias();
  }

  async getEvidencias()
  {
    await this.presentLoading();
    this.api.getTipoEvidencias()
    .pipe(finalize(async () => {
    }))
    .subscribe(r => 
    {
      this.tipoEvidencias = r.data;
      this.api.getEvidencias(this.id)
      .pipe(finalize(async () => {
        await this.loader.dismiss();
      }))
      .subscribe(r => 
      {
        this.evidenciasRequeridas = r.data.obligatorias;
        this.evidenciasAdicionales = r.data.extras;
        this.cargado = true;
        setTimeout(() =>
        {
          var objectSelectElement = document.getElementById('tipoEvidencia');
          //objectSelectElement.compareWith = compareWithFn;
          this.tipoEvidencias.forEach(function (e: any) {
            var selectOption = document.createElement('ion-select-option');
            selectOption.value = e;
            selectOption.textContent = e.nombre;
            if (objectSelectElement !== null) {
              objectSelectElement.appendChild(selectOption);
            }
            //objectSelectElement.appendChild(selectOption);
          });
        }, 0);
      });
    });
  }
  async presentLoading() 
  {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }
  async getValor()
  {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps: 
      {
        id: this.seleccionado.id,
        ItinerarioID: this.id,
        nombre: this.seleccionado.nombre
      }
    });
    modal.onDidDismiss()
    .then((data) => 
    {
      console.log(data.data.data);
      if(data.data.data)
        this.evidenciasAdicionales.push(data.data.data);
    });
    return await modal.present();
  }
  

}

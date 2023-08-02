import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diesel-view',
  templateUrl: './diesel-view.component.html',
  styleUrls: ['./diesel-view.component.scss']
})
export class DieselViewComponent implements OnInit {
  loader: any;
  camiones: any = [];
  search?: any = '';
  camion: any;
  titulo: any;
  camionSeleccionado: any;
  historial: any[] =[];
  id: any;

  constructor(
    private api: ApiService,
    private loading: LoadingController,
    public modalController: ModalController,
    private Activatedroute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCamionesTabla();
  }

  async getCamionesTabla() {
    await this.presentLoading();
    this.api.getCamionesTabla()
      .pipe(
        finalize(async () => {
          await this.loader.dismiss();
        })
      )
      .subscribe(
        (response: any) => {
          this.camiones = response.data;
          //console.log(this.camiones);

          this.Activatedroute.paramMap.subscribe(params => {
            this.id = Number(params.get('id'));
            this.camionSeleccionado = this.camiones.find((camion: { id: number }) => camion.id === this.id);
            console.log(this.camionSeleccionado);
            console.log(this.id);
            
            this.getCamionById(this.id);
          });
        },
        (error) => {
          console.error('Error al obtener los datos de la API:', error);
        }
      );
  }

  async getCamionById(id: number) {
    //console.log("hola");
    this.api.getCamion(id).subscribe(
      (data: any) => {
        //this.camionSeleccionado = data.camion;
        this.historial = data.historial;
        this.loader.dismiss();
      },
      (error) => {
        console.error('Error al obtener datos del camión:', error);
        this.loader.dismiss();
      }
    );
  }

  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }

  form()
  {
    this.router.navigate(['diesel-view/'+this.id+'/diesel-form']);
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-diesel-index',
  templateUrl: './diesel-index.component.html',
  styleUrls: ['./diesel-index.component.scss']
})
export class DieselIndexComponent implements OnInit {
  loader: any;
  camiones: any;
  search?: any =''; // Puedes cambiar 'any' a un tipo más específico si conoces el tipo exacto de la propiedad 'search'
  searchTerm: string = '';

  id: any;
  constructor(
    private api: ApiService,
    private loading: LoadingController,
    public modalController: ModalController,
    private Activatedroute: ActivatedRoute
  ) {
    this.Activatedroute.paramMap.subscribe(params => {
      this.getCamionesTabla();
      this.id = params.get('id');
    });

  }
  async ngOnInit(): Promise<void> {
    this.getCamionesTabla();
    await this.presentLoading();
    //throw new Error('Method not implemented.');
  }
  async getCamionesTabla() {
   
    this.api.getCamionesTabla()
      .pipe(finalize(async () => {

        await this.loader.dismiss();
      }))
      .subscribe((response: any) => {
        // Asignar los datos recibidos a la variable camiones
        this.camiones = response.data;
        console.log(this.camiones);

        // Realizar el filtrado según el valor de búsqueda
        if (this.search) {
          //const searchLower = this.search.toLowerCase();
          this.camiones = this.camiones.filter((x: any) =>
            x.NoEconomico.toString().includes()
          );
        }
      },
        (error) => {
          console.error('Error al obtener los datos de la API:', error);
          // Agregar cualquier lógica de manejo de errores necesaria
        }
      );
  }
  async presentLoading() {
    this.loader = await this.loading.create({
      message: 'Cargando...',
    });
    await this.loader.present();
  }

}

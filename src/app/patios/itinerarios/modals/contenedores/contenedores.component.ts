import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrls: ['./contenedores.component.scss']
})
export class ContenedoresComponent implements OnInit{
  @Input() data: any
  contenedores: any;
  ctpad: any;
  contenedor: any;
  
  constructor(
    public modalController: ModalController,
    public api: ApiService,
  ){}

  ngOnInit(): void {
    this.contenedores = this.data;
  }
  seleccionarDriverMove(x: any){
    this.contenedor = x;
    this.api.getPuntosCTPAD(this.contenedor.ItinerarioID)
    .subscribe(r =>{
      console.log(r);
      this.ctpad = r.data;
      this.modalController.dismiss({
        'dismissed': true,
        data: this.ctpad
      });
     
    })
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
     
    });
  };

}

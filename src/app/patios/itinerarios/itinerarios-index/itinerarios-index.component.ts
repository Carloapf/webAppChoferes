import { Component, OnInit } from '@angular/core';
import { LuDatePipe } from '../../../pipes/luDate.pipe'
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';
const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-itinerarios-index',
  templateUrl: './itinerarios-index.component.html',
  styleUrls: ['./itinerarios-index.component.scss']
})
export class ItinerariosIndexComponent implements OnInit {
  public Tokenkey: string = TOKEN_KEY;

  opcion: any;
  contenedores: any;
  contenedor: any;
  data: any
  flag: boolean = false;
  WContenedorID:any;
  contenedores2: any;
  switchValue:any = 1;
  
  constructor(
    private api: ApiService,
    private storage: Storage,
  )
  {}

  ngOnInit(): void {
    this.storage.get(TOKEN_KEY).then((r) => 
        {
          this.data = r;
          console.log(this.data.PatioID);
        })
    
  }

  onSwitchChange(){
    if (this.switchValue == 1) {
      this.switchValue = 2; // Cambiar a 2 cuando se desactiva
    } else {
      this.switchValue = 1; // Cambiar a 1 cuando se activa
    }
    console.log(this.switchValue);
  }

  getContenedor(contenedor:any){
    console.log(contenedor);
    
    var data = 
        {
            contenedor: contenedor,
            PatioID: this.data.PatioID,
            tipo: 1
        };
    console.log(data);
    this.api.getContenedorPatio(data)
    .subscribe(r =>{
      console.log(r);
      this.contenedores2 =r;
      this.contenedores = this.contenedores2.data
      console.log(this.contenedores);
      this.flag = true;
    });
  }

  buscarContenedor(WContenedorID: any){
    console.log(WContenedorID);
    var data = 
        {
            WContenedorID: WContenedorID,
            PatioID: this.data.PatioID,
            tipo: 2
        };
        console.log(data);
        this.api.getContenedorPatio(data)
        .subscribe(r =>{
          console.log(r);
          /*this.contenedores =r;
          console.log(this.contenedores);*/
          this.flag = true;
        });
  }

  irItineratio(x: any){
    localStorage.setItem('itinerarioActual', JSON.stringify(x));
    console.log("enrutamos");
  }
}

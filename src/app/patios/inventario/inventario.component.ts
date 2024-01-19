import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';
const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit{
  public Tokenkey: string = TOKEN_KEY;

  contenedores: any;
  info: any;
  patioID: any;
  buscado: boolean = false;
  contenedores2: any;
  selected=1;

  constructor(
    private api: ApiService,
    private storage: Storage,
  ){}
  

  ngOnInit() {
    this.getContenedoresPatio();
    
  }
  getContenedoresPatio(){
    this.storage.get(TOKEN_KEY).then((r) => 
        {
          this.patioID = r;
          console.log(r);
          console.log(this.patioID);
          //this.patioID = 3;
          this.api.getContenedoresPatio(r)
          .subscribe(Response =>
            {
            console.log(Response);
            this.contenedores2 = Response;
            this.info = this.contenedores2.data.info;
            this.contenedores = this.contenedores2.data.contenedores;
            this.buscado = true;
            console.log(this.info);
            console.log(this.contenedores);
          });
        })

        
    

  }

}

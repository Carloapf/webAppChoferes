import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss'],
})
export class ManualComponent implements OnInit {
  activo: any = 0;
  principal: any = 1;
  constructor() { }

  ngOnInit() {
    this.funcionDeReemplazo();
  }
  verSeccion(seccion: any)
  {
    //console.log('entra');
    if(this.activo == seccion)
      this.activo = 0;
    else
      this.activo = seccion;
    //console.log(this.activo);
  };

  funcionDeReemplazo(){
    //console.log("No hay imagen");
  };
}

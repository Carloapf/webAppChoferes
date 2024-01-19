import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss']
})
export class FirmaComponent implements OnInit{
  @ViewChild('canvas', { static: true }) signaturePadElement!: { nativeElement: HTMLCanvasElement; };
  @Input() data: any
  contenedor: any;
  signaturePad: any;

  constructor(
    public modalController: ModalController,
  ){}

  ngOnInit(): void {
    this.contenedor = this.data;
    console.log(this.contenedor);
    this.addSignature();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      //data: data
    });
  };

  addSignature()
    {
        //const canvas: any = this.elementref.nativeElement.querySelector('canvas');
        //canvas.width = window.innerWidth;
        //canvas.height = 200;
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
        console.log("Aqui", this.signaturePad);
        this.signaturePad.clear();
        this.signaturePad.penColor = 'rgb(56,128,255)';
        
    }
    clearCanvas()
    {
        this.signaturePad.clear();
    }

    saveCanvas(){
      this.contenedor.Firmak9 = this.signaturePad.toDataURL();
      this.modalController.dismiss({
        'dismissed': true,
        data: this.contenedor
      });
      console.log(this.contenedor);
    }

}

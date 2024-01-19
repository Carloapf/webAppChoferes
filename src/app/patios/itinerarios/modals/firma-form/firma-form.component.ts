import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-firma-form',
  templateUrl: './firma-form.component.html',
  styleUrls: ['./firma-form.component.scss']
})
export class FirmaFormComponent implements OnInit{
  @ViewChild('canvas', { static: true }) signaturePadElement!: { nativeElement: HTMLCanvasElement; };
  @ViewChild('canvas2', { static: true }) signaturePadElement2!: { nativeElement: HTMLCanvasElement; };
  @Input() data: any
  contenedor: any;
  signaturePad: any;
  signaturePad2: any;

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

        this.signaturePad2 = new SignaturePad(this.signaturePadElement2.nativeElement);
        //console.log("Aqui", this.signaturePad);
        this.signaturePad2.clear();
        this.signaturePad2.penColor = 'rgb(56,128,255)';
        
    }

    clearCanvas2()
    {
        this.signaturePad2.clear();
    }
    clearCanvas()
    {
        this.signaturePad.clear();
    }
    saveCanvas2(){
      this.contenedor.FirmaChofer = this.signaturePad2.toDataURL();
      console.log(this.contenedor);
    }
    saveCanvas(){
      //this.contenedor.Firmak9 = this.signaturePad.toDataURL();
      this.contenedor.FirmaGuardia = this.signaturePad.toDataURL();
      console.log(this.contenedor);
      /*this.modalController.dismiss({
        'dismissed': true,
        data: this.contenedor
      });*/
    }
    saveFirmas(){
      this.saveCanvas2();
      this.saveCanvas();
      this.modalController.dismiss({
        'dismissed': true,
        data: this.contenedor
      });
    }
}

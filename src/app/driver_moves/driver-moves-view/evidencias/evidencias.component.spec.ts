import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvidenciasPage } from './evidencias.component';

describe('EvidenciasPage', () => {
  let component: EvidenciasPage;
  let fixture: ComponentFixture<EvidenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

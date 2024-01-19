import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitanteComponent } from './visitante.component';

describe('VisitanteComponent', () => {
  let component: VisitanteComponent;
  let fixture: ComponentFixture<VisitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitanteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

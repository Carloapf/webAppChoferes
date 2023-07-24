import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VencimientosPage } from './vencimientos.component';

describe('VencimientosPage', () => {
  let component: VencimientosPage;
  let fixture: ComponentFixture<VencimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencimientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VencimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

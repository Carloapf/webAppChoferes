import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitantesViewComponent } from './visitantes-view.component';

describe('VisitantesViewComponent', () => {
  let component: VisitantesViewComponent;
  let fixture: ComponentFixture<VisitantesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitantesViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitantesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

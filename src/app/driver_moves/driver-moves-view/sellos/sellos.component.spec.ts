import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellosPage } from './sellos.component';

describe('SellosPage', () => {
  let component: SellosPage;
  let fixture: ComponentFixture<SellosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

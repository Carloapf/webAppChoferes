import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverMovesIndexPage } from './driver-moves-index.component';

describe('DriverMovesIndexPage', () => {
  let component: DriverMovesIndexPage;
  let fixture: ComponentFixture<DriverMovesIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMovesIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverMovesIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

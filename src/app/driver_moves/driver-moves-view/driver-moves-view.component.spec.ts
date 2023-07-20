import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverMovesViewPage } from './driver-moves-view.component';

describe('DriverMovesViewPage', () => {
  let component: DriverMovesViewPage;
  let fixture: ComponentFixture<DriverMovesViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMovesViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverMovesViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

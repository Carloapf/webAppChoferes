import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariosViewComponent } from './itinerarios-view.component';

describe('ItinerariosViewComponent', () => {
  let component: ItinerariosViewComponent;
  let fixture: ComponentFixture<ItinerariosViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItinerariosViewComponent]
    });
    fixture = TestBed.createComponent(ItinerariosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

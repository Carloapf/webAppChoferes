import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariosIndexComponent } from './itinerarios-index.component';

describe('ItinerariosIndexComponent', () => {
  let component: ItinerariosIndexComponent;
  let fixture: ComponentFixture<ItinerariosIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItinerariosIndexComponent]
    });
    fixture = TestBed.createComponent(ItinerariosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

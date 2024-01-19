import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariosFormComponent } from './itinerarios-form.component';

describe('ItinerariosFormComponent', () => {
  let component: ItinerariosFormComponent;
  let fixture: ComponentFixture<ItinerariosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItinerariosFormComponent]
    });
    fixture = TestBed.createComponent(ItinerariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionComponent } from './inspeccion.component';

describe('InspeccionComponent', () => {
  let component: InspeccionComponent;
  let fixture: ComponentFixture<InspeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspeccionComponent]
    });
    fixture = TestBed.createComponent(InspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

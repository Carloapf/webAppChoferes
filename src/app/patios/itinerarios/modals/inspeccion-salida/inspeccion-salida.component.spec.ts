import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspeccionSalidaComponent } from './inspeccion-salida.component';

describe('InspeccionSalidaComponent', () => {
  let component: InspeccionSalidaComponent;
  let fixture: ComponentFixture<InspeccionSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspeccionSalidaComponent]
    });
    fixture = TestBed.createComponent(InspeccionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedoresComponent } from './contenedores.component';

describe('ContenedoresComponent', () => {
  let component: ContenedoresComponent;
  let fixture: ComponentFixture<ContenedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContenedoresComponent]
    });
    fixture = TestBed.createComponent(ContenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

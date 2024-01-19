import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselLoginComponent } from './diesel-login.component';

describe('DieselLoginComponent', () => {
  let component: DieselLoginComponent;
  let fixture: ComponentFixture<DieselLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DieselLoginComponent]
    });
    fixture = TestBed.createComponent(DieselLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

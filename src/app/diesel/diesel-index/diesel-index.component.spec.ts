import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselIndexComponent } from './diesel-index.component';

describe('DieselIndexComponent', () => {
  let component: DieselIndexComponent;
  let fixture: ComponentFixture<DieselIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DieselIndexComponent]
    });
    fixture = TestBed.createComponent(DieselIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselViewComponent } from './diesel-view.component';

describe('DieselViewComponent', () => {
  let component: DieselViewComponent;
  let fixture: ComponentFixture<DieselViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DieselViewComponent]
    });
    fixture = TestBed.createComponent(DieselViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

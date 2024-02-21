import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVaccinationComponent } from './single-vaccination.component';

describe('SingleVaccinationComponent', () => {
  let component: SingleVaccinationComponent;
  let fixture: ComponentFixture<SingleVaccinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleVaccinationComponent]
    });
    fixture = TestBed.createComponent(SingleVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

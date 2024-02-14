import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCentreComponent } from './single-centre.component';

describe('SingleCentreComponent', () => {
  let component: SingleCentreComponent;
  let fixture: ComponentFixture<SingleCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCentreComponent]
    });
    fixture = TestBed.createComponent(SingleCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

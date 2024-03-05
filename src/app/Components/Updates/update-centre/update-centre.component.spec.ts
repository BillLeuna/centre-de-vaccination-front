import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCentreComponent } from './update-centre.component';

describe('UpdateCentreComponent', () => {
  let component: UpdateCentreComponent;
  let fixture: ComponentFixture<UpdateCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCentreComponent]
    });
    fixture = TestBed.createComponent(UpdateCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminCentreComponent } from './update-admin-centre.component';

describe('UpdateAdminCentreComponent', () => {
  let component: UpdateAdminCentreComponent;
  let fixture: ComponentFixture<UpdateAdminCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdminCentreComponent]
    });
    fixture = TestBed.createComponent(UpdateAdminCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

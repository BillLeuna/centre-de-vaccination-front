import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminCentreComponent } from './create-admin-centre.component';

describe('CreateAdminCentreComponent', () => {
  let component: CreateAdminCentreComponent;
  let fixture: ComponentFixture<CreateAdminCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdminCentreComponent]
    });
    fixture = TestBed.createComponent(CreateAdminCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

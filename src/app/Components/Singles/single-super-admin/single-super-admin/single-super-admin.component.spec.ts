import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSuperAdminComponent } from './single-super-admin.component';

describe('SingleSuperAdminComponent', () => {
  let component: SingleSuperAdminComponent;
  let fixture: ComponentFixture<SingleSuperAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleSuperAdminComponent]
    });
    fixture = TestBed.createComponent(SingleSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

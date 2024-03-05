import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAdminComponent } from './single-admin.component';

describe('SingleAdminComponent', () => {
  let component: SingleAdminComponent;
  let fixture: ComponentFixture<SingleAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAdminComponent]
    });
    fixture = TestBed.createComponent(SingleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

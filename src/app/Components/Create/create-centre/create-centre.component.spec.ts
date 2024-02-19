import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCentreComponent } from './create-centre.component';

describe('CreateCentreComponent', () => {
  let component: CreateCentreComponent;
  let fixture: ComponentFixture<CreateCentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCentreComponent]
    });
    fixture = TestBed.createComponent(CreateCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

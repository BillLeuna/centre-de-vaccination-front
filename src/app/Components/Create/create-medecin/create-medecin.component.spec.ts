import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedecinComponent } from './create-medecin.component';

describe('CreateMedecinComponent', () => {
  let component: CreateMedecinComponent;
  let fixture: ComponentFixture<CreateMedecinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMedecinComponent]
    });
    fixture = TestBed.createComponent(CreateMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

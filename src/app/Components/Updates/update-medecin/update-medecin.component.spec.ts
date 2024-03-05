import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedecinComponent } from './update-medecin.component';

describe('UpdateMedecinComponent', () => {
  let component: UpdateMedecinComponent;
  let fixture: ComponentFixture<UpdateMedecinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMedecinComponent]
    });
    fixture = TestBed.createComponent(UpdateMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCompteComponent } from './mon-compte.component';

describe('MonCompteComponent', () => {
  let component: MonCompteComponent;
  let fixture: ComponentFixture<MonCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonCompteComponent]
    });
    fixture = TestBed.createComponent(MonCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocViewAppointmentComponent } from './doc-view-appointment.component';

describe('DocViewAppointmentComponent', () => {
  let component: DocViewAppointmentComponent;
  let fixture: ComponentFixture<DocViewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocViewAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocViewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

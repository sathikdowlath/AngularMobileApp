import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPatientRecordsComponent } from './doc-patient-records.component';

describe('DocPatientRecordsComponent', () => {
  let component: DocPatientRecordsComponent;
  let fixture: ComponentFixture<DocPatientRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPatientRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPatientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

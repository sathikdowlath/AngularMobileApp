import { TestBed } from '@angular/core/testing';

import { GetFirebaseDataService } from './get-firebase-data.service';

describe('GetFirebaseDataService', () => {
  let service: GetFirebaseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFirebaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

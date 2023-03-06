import { TestBed } from '@angular/core/testing';

import { adminLoginService } from './login.service';

describe('HrloginService', () => {
  let service: adminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(adminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

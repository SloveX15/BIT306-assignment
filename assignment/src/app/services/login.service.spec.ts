import { TestBed } from '@angular/core/testing';

import { AdminLoginService } from './login.service';

describe('HrloginService', () => {
  let service: AdminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RouteControlService } from './route-control.service';

describe('RouteControlService', () => {
  let service: RouteControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

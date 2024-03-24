import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canMGuard } from './can-m.guard';

describe('canMGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canMGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

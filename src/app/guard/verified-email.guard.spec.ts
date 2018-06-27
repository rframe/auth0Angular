import { TestBed, async, inject } from '@angular/core/testing';

import { VerifiedEmailGuard } from './verified-email.guard';

describe('VerifiedEmailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifiedEmailGuard]
    });
  });

  it('should ...', inject([VerifiedEmailGuard], (guard: VerifiedEmailGuard) => {
    expect(guard).toBeTruthy();
  }));
});

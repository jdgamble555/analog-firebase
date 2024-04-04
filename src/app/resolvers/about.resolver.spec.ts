import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { aboutResolver } from './about.resolver';

describe('aboutResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => aboutResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

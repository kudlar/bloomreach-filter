import { TestBed } from '@angular/core/testing';

import { FilterStateService } from 'src/app/shared/services/filter-state.service';

describe('FilterStateService', () => {
  let service: FilterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

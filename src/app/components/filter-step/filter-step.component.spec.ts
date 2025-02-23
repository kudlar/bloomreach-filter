import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStepComponent } from './filter-step.component';

describe('FilterStepComponent', () => {
  let component: FilterStepComponent;
  let fixture: ComponentFixture<FilterStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

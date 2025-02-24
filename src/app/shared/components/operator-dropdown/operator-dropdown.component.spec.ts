import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorDropdownComponent } from './operator-dropdown.component';

describe('OperatorDropdownComponent', () => {
  let component: OperatorDropdownComponent;
  let fixture: ComponentFixture<OperatorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

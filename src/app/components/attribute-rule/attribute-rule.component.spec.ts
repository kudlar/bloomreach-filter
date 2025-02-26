import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeRuleComponent } from './attribute-rule.component';

describe('AttributeRuleComponent', () => {
  let component: AttributeRuleComponent;
  let fixture: ComponentFixture<AttributeRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

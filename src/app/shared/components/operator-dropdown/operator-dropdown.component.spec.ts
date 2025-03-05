import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Attribute } from 'src/app/model/filter';
import { NumberOperator } from 'src/app/model/number-operator.enum';
import { StringOperator } from 'src/app/model/string-operator.enum';
import { OperatorDropdownComponent } from './operator-dropdown.component';

describe('OperatorDropdownComponent', () => {
    let component: OperatorDropdownComponent;
    let componentRef: ComponentRef<OperatorDropdownComponent>;
    let fixture: ComponentFixture<OperatorDropdownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OperatorDropdownComponent, FormsModule, ReactiveFormsModule], // Import standalone component
        }).compileComponents();

        fixture = TestBed.createComponent(OperatorDropdownComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;

        // Trigger ngOnInit manually
        component.ngOnInit();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('Initialization', () => {
        it('should initialize selectedOperator$ based on selectedAttribute$', () => {
            const selectedAttribute: Attribute = { property: 'name', type: 'string' };

            componentRef.setInput('selectedAttribute', selectedAttribute);
            fixture.detectChanges();

            expect(component.selectedOperator$.value).toBe(Object.values(StringOperator)[0]);
        });

        it('should update activeTab$ when selectedOperator$ changes', () => {
            const setActiveTabSpy = jest.spyOn(component.activeTab$, 'next');

            component.selectedOperator$.next(StringOperator.Contains);

            expect(setActiveTabSpy).toHaveBeenCalledWith('string');

            component.selectedOperator$.next(NumberOperator.GreaterThan);

            expect(setActiveTabSpy).toHaveBeenCalledWith('number');
        });
    });

    describe('Dropdown Behavior', () => {
        it('should open dropdown when openDropdown is called', () => {
            const event = new MouseEvent('click');
            component.openDropdown(event);
            expect(component.dropdownPanelOpened()).toBe(true);
        });

        it('should close dropdown when closeDropdown is called', () => {
            component.closeDropdown();
            expect(component.dropdownPanelOpened()).toBe(false);
        });
    });

    describe('Operator Selection', () => {
        it('should emit selected operator when selectOperator is called', () => {
            const emitSpy = jest.spyOn(component.onSelectOption, 'emit');
            const operator = StringOperator.DoesNotContain;

            component.selectOperator(operator);

            expect(component.selectedOperator$.value).toBe(operator);
            expect(emitSpy).toHaveBeenCalledWith(operator);
            expect(component.dropdownPanelOpened()).toBe(false);
        });
    });

    describe('ControlValueAccessor', () => {
        it('should write value correctly', () => {
            const emitSpy = jest.spyOn(component.onSelectOption, 'emit');
            const operator = StringOperator.DoesNotContain;

            component.writeValue(operator);

            expect(component.selectedOperator$.value).toBe(operator);
            expect(emitSpy).toHaveBeenCalledWith(operator);
        });

        it('should register onChange callback', () => {
            const onChangeSpy = jest.fn();
            component.registerOnChange(onChangeSpy);

            component.onChange(StringOperator.Equals);

            expect(onChangeSpy).toHaveBeenCalledWith(StringOperator.Equals);
        });

        it('should register onTouched callback', () => {
            const onTouchedSpy = jest.fn();
            component.registerOnTouched(onTouchedSpy);

            component.markAsTouched();

            expect(onTouchedSpy).toHaveBeenCalled();
            expect(component.touched).toBe(true);
        });

        it('should set disabled state correctly', () => {
            component.setDisabledState(true);
            expect(component.disabled).toBe(true);

            component.setDisabledState(false);
            expect(component.disabled).toBe(false);
        });
    });
});

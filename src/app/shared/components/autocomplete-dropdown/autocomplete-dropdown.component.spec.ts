import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventType } from 'src/app/model/event-list-response';
import { AutocompleteService } from 'src/app/shared/components/autocomplete-dropdown/services/autocomplete.service';
import { isAttribute } from 'src/app/shared/helpers';
import { AutocompleteDropdownComponent } from './autocomplete-dropdown.component';

describe('AutocompleteDropdownComponent', () => {
    let component: AutocompleteDropdownComponent;
    let componentRef: ComponentRef<AutocompleteDropdownComponent>;
    let fixture: ComponentFixture<AutocompleteDropdownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            providers: [AutocompleteService],
        }).compileComponents();

        fixture = TestBed.createComponent(AutocompleteDropdownComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should filter options based on search term', () => {
        const eventList: EventType[] = [
            { type: 'event1', properties: [] },
            { type: 'event2', properties: [] },
        ];
        const selectedEvent: EventType = { type: 'event1', properties: [] };
        const searchTerm = 'event1';

        componentRef.setInput('eventList', eventList);
        componentRef.setInput('selectedEvent', selectedEvent);

        component.searchTerm.set(searchTerm);

        expect(component.filteredOptions()).toEqual([]);
    });

    it('should select an option and emit it', () => {
        const option: EventType = { type: 'event1', properties: [] };
        const emitSpy = jest.spyOn(component.onSelectOption, 'emit');
        const onChangeSpy = jest.fn();

        // Set up the onChange callback
        component.registerOnChange(onChangeSpy);

        component.selectOption(option);

        expect(component.selectedOption()).toEqual(option);
        expect(emitSpy).toHaveBeenCalledWith(option);
        expect(onChangeSpy).toHaveBeenCalledWith(option);
        expect(component.dropdownPanelOpened()).toBe(false); // dropdown should close
    });

    it('should open and close the dropdown correctly', () => {
        const openEvent = new MouseEvent('click');
        component.openDropdown(openEvent);
        expect(component.dropdownPanelOpened()).toBe(true);

        component.closeDropdown();
        expect(component.dropdownPanelOpened()).toBe(false);
    });

    it('should write the value correctly', () => {
        const option: EventType = { type: 'event1', properties: [] };
        const emitSpy = jest.spyOn(component.onSelectOption, 'emit');

        component.writeValue(option);

        expect(component.selectedOption()).toEqual(option);
        expect(emitSpy).toHaveBeenCalledWith(option);
    });

    it('should register onChange callback correctly', () => {
        const onChangeSpy = jest.fn();

        component.registerOnChange(onChangeSpy);
        const option: EventType = { type: 'event1', properties: [] };

        component.onChange(option);

        expect(onChangeSpy).toHaveBeenCalledWith(option);
    });

    it('should register onTouched callback correctly', () => {
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

    it('should call the correct helper functions for type checking', () => {
        const isAttributeSpy = jest.spyOn({ isAttribute }, 'isAttribute');

        const option: EventType = { type: 'event1', properties: [] };

        component.selectedOption.set(option);
        component.selectedOptionName();

        expect(isAttributeSpy).toHaveBeenCalledTimes(0);
    });
});

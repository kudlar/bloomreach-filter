import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';
import { AutocompleteService } from 'src/app/shared/components/autocomplete-dropdown/services/autocomplete.service';
import { InputSearchComponent } from 'src/app/shared/components/input-search/input-search.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import { isAttribute, isEvent } from 'src/app/shared/helpers';

@Component({
    selector: 'app-autocomplete-dropdown',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        ClickOutsideDirective,
        InputSearchComponent,
    ],
    providers: [AutocompleteService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: AutocompleteDropdownComponent,
            multi: true,
        }],
    templateUrl: './autocomplete-dropdown.component.html',
    styleUrl: './autocomplete-dropdown.component.scss',
})
export class AutocompleteDropdownComponent implements ControlValueAccessor {
    autocompleteService = inject(AutocompleteService);

    eventList = input.required<EventType[]>();
    selectedEvent = input<EventType | null>(null);
    selectedOption = signal<EventType | Attribute | null>(null);
    selectedOptionName = computed((): string => {
        if (this.selectedOption() !== null) {
            return isEvent(this.selectedOption()!) ? this.selectedOption()!.type : (<Attribute> this.selectedOption())!.property;
        }
        return '';
    });
    onSelectOption = output<EventType | Attribute>();

    searchTerm = signal<string>('');
    dropdownPanelOpened = signal<boolean>(false);
    filteredOptions = computed((): EventType[] | Attribute[] => {
        return this.autocompleteService.filterOptions(this.eventList(), this.selectedEvent(), this.searchTerm());
    });

    selectOption(option: EventType | Attribute): void {
        this.selectedOption.set(option);
        this.onSelectOption.emit(option);
        this.onChange(option);
        this.closeDropdown();
    }

    openDropdown(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.markAsTouched();
        if (!this.disabled) {
            this.dropdownPanelOpened.set(true);
        }
    }

    closeDropdown(): void {
        this.dropdownPanelOpened.set(false);
    }

    // ControlValueAccessor methods
    touched = false;
    disabled = false;

    writeValue(value: EventType | Attribute) {
        this.selectedOption.set(value);
    }

    onChange = (value: EventType | Attribute) => {
    };

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    onTouched = () => {
    };

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    protected readonly isEvent = isEvent;
    protected readonly isAttribute = isAttribute;
}

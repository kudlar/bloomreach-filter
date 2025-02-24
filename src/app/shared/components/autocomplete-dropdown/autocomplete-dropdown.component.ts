import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';
import { AutocompleteService } from 'src/app/shared/components/autocomplete-dropdown/services/autocomplete.service';
import { InputSearchComponent } from 'src/app/shared/components/input-search/input-search.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';

@Component({
    selector: 'app-autocomplete-dropdown',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        ClickOutsideDirective,
        InputSearchComponent,
    ],
    providers: [AutocompleteService],
    templateUrl: './autocomplete-dropdown.component.html',
    styleUrl: './autocomplete-dropdown.component.scss',
})
export class AutocompleteDropdownComponent {
    autocompleteService = inject(AutocompleteService);

    eventList = input.required<EventType[]>();
    selectedEvent = input<EventType | null>(null);
    selectedOptionName = signal<string | null>(null);
    onSelectOption = output<EventType | Attribute>();

    searchTerm = signal<string>('');
    dropdownPanelOpened = signal<boolean>(false);
    filteredOptions = computed((): EventType[] | Attribute[] => {
        return this.autocompleteService.filterOptions(this.eventList(), this.selectedEvent(), this.searchTerm());
    });

    selectOption(option: EventType | Attribute): void {
        this.selectedOptionName.set(this.isEvent(option) ? option.type : option.property);
        this.onSelectOption.emit(option);
    }

    openDropdown(e: MouseEvent): void {
        e.preventDefault();
        this.dropdownPanelOpened.set(true);
    }

    closeDropdown(): void {
        this.dropdownPanelOpened.set(false);
    }

    isEvent(option: EventType | Attribute): option is EventType {
        return 'properties' in (option as EventType);
    }

    isAttribute(option: EventType | Attribute): option is Attribute {
        return !this.isEvent(option);
    }
}

import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteService } from 'src/app/shared/components/autocomplete-dropdown/services/autocomplete.service';
import { InputSearchComponent } from 'src/app/shared/components/input-search/input-search.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import { Event } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';

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

    eventList = input.required<Event[]>();
    selectedEvent = input<Event | null>(null);

    searchTerm = signal<string>('');
    dropdownOpened = signal<boolean>(false);
    filteredOptions = computed((): Event[] | Attribute[] => {
        return this.autocompleteService.filterOptions(this.eventList(), this.selectedEvent(), this.searchTerm());
    });

    selectOption(option: Event | Attribute): void {
        console.log('option', option);
    }

    openDropdown(e: MouseEvent): void {
        e.preventDefault();
        this.dropdownOpened.set(true);
    }

    closeDropdown(): void {
        this.dropdownOpened.set(false);
    }
}

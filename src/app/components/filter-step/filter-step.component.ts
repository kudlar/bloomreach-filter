import { Component, input, signal } from '@angular/core';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute, FilterStep } from 'src/app/model/filter';
import { AutocompleteDropdownComponent } from 'src/app/shared/components/autocomplete-dropdown/autocomplete-dropdown.component';

@Component({
    selector: 'app-filter-step',
    imports: [
        AutocompleteDropdownComponent,
    ],
    templateUrl: './filter-step.component.html',
    styleUrl: './filter-step.component.scss',
})
export class FilterStepComponent {
    step = input.required<FilterStep>();
    index = input.required<number>();
    eventList = input.required<EventType[] | []>();

    selectedEvent = signal<EventType | null>(null);
    selectedAttribute = signal<Attribute | null>(null);
    attributeDropdownOpened = signal<boolean>(false);

    selectEvent(option: EventType | Attribute): void {
        this.selectedEvent.set(option as EventType);
    }

    selectAttribute(option: EventType | Attribute): void {
        this.selectedAttribute.set(option as Attribute);
    }

    showAttributeDropdown(): void {
        this.attributeDropdownOpened.set(true);
    }
}

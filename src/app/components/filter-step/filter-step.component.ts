import { Component, input } from '@angular/core';
import { Event } from 'src/app/model/event-list-response';
import { FilterStep } from 'src/app/model/filter';
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
    eventList = input.required<Event[] | []>();
}

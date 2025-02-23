import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EventsListResponse } from 'src/app/model/events-list-response';
import { FilterStep } from 'src/app/model/filter';

@Component({
    selector: 'app-filter-step',
    imports: [
        MatIcon,
    ],
    templateUrl: './filter-step.component.html',
    styleUrl: './filter-step.component.scss',
})
export class FilterStepComponent {
    step = input.required<FilterStep>();
    index = input.required<number>();
    eventsList = input.required<EventsListResponse | []>();
}

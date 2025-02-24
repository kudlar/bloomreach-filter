import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FilterStepComponent } from 'src/app/components/filter-step/filter-step.component';
import { Event, EventListResponse } from 'src/app/model/event-list-response';
import { FilterStateService } from 'src/app/shared/services/filter-state.service';
import { EventsService } from 'src/services/events.service';

@Component({
    selector: 'app-customer-filter',
    imports: [
        FilterStepComponent,
        AsyncPipe,
    ],
    providers: [EventsService],
    templateUrl: './customer-filter.component.html',
    styleUrl: './customer-filter.component.scss',
})
export class CustomerFilterComponent {
    filterStateService = inject(FilterStateService);
    eventsService = inject(EventsService);
    eventList: Event[] = [];

    constructor() {
        this.eventsService.fetchEventList()
            .pipe(
                takeUntilDestroyed(),
                tap(event => console.log('events', event)),
            )
            .subscribe((eventsResponse: EventListResponse) => {
                this.eventList = eventsResponse.events;
            });
    }

    discardFilters() {

    }

    applyFilters() {

    }
}

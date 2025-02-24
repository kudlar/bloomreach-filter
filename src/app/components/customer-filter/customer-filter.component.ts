import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { FilterStepComponent } from 'src/app/components/filter-step/filter-step.component';
import { EventListResponse, EventType } from 'src/app/model/event-list-response';
import { FilterStateService } from 'src/app/shared/services/filter-state.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { EventsService } from 'src/services/events.service';

@Component({
    selector: 'app-customer-filter',
    imports: [
        FilterStepComponent,
        ReactiveFormsModule,
    ],
    providers: [EventsService],
    templateUrl: './customer-filter.component.html',
    styleUrl: './customer-filter.component.scss',
})
export class CustomerFilterComponent {
    filterStateService = inject(FilterStateService);
    eventsService = inject(EventsService);
    filterService = inject(FilterService);

    eventList: EventType[] = [];
    filterForm: FormGroup = this.filterService.form;

    constructor() {
        this.eventsService.fetchEventList()
            .pipe(
                takeUntilDestroyed(),
                tap(event => console.log('events', event)),
            )
            .subscribe((eventsResponse: EventListResponse) => {
                this.eventList = eventsResponse.events;
            });

        //
        this.filterForm.valueChanges.subscribe(value => {
            console.warn('Filter Form Value Changes:', value);
        });
    }

    discardFilters() {

    }

    applyFilters() {
    }
}

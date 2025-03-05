import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterStepComponent } from 'src/app/components/filter-step/filter-step.component';
import { EventListResponse, EventType } from 'src/app/model/event-list-response';
import { FilterState } from 'src/app/model/filter';
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
    eventsService = inject(EventsService);
    filterService = inject(FilterService);

    eventList: EventType[] = [];
    filterForm: FormGroup = this.filterService.form;

    constructor() {
        this.initForm();

        this.eventsService.fetchEventList()
            .pipe(takeUntilDestroyed())
            .subscribe((eventsResponse: EventListResponse) => {
                this.eventList = eventsResponse.events;
            });

        this.filterForm.valueChanges.subscribe((value: FilterState) => {
            console.warn('Filter Form Value Changes:', value);
        });
    }

    discardFilterForm(): void {
        this.filterService.steps.clear();
        this.initForm();
    }

    applyFilters(): void {
        const formValues: FilterState = this.filterForm.value;
        console.log('Filter Form Values:', formValues);
    }

    private initForm(): void {
        this.filterService.addStep();
    }
}

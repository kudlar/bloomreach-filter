import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FilterStateService } from 'src/app/core/filter-state.service';
import { FilterStepComponent } from 'src/app/components/filter-step/filter-step.component';

@Component({
    selector: 'app-customer-filter',
    imports: [
        FilterStepComponent,
        MatButton,
    ],
    templateUrl: './customer-filter.component.html',
    styleUrl: './customer-filter.component.scss',
})
export class CustomerFilterComponent {

    private filterState = inject(FilterStateService);

    discardFilters() {

    }

    applyFilters() {

    }
}

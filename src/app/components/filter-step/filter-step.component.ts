import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';
import { AutocompleteDropdownComponent } from 'src/app/shared/components/autocomplete-dropdown/autocomplete-dropdown.component';
import { OperatorDropdownComponent } from 'src/app/shared/components/operator-dropdown/operator-dropdown.component';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
    selector: 'app-filter-step',
    imports: [
        AutocompleteDropdownComponent,
        ReactiveFormsModule,
        OperatorDropdownComponent,
    ],
    templateUrl: './filter-step.component.html',
    styleUrl: './filter-step.component.scss',
})
export class FilterStepComponent {
    filterService = inject(FilterService);

    stepFormGroup = input.required<FormGroup>();

    stepIndex = input.required<number>();
    eventList = input.required<EventType[] | []>();

    selectedEvent = signal<EventType | null>(null);
    selectedAttribute = signal<Attribute | null>(null);
    attributeDropdownOpened = signal<boolean>(false);

    selectEvent(option: EventType | Attribute): void {
        this.selectedEvent.set(option as EventType);
        this.filterService.addAttributeRule(this.stepIndex());
    }

    selectAttribute(option: EventType | Attribute): void {
        this.selectedAttribute.set(option as Attribute);
    }

    showAttributeDropdown(): void {
        this.attributeDropdownOpened.set(true);
    }
}

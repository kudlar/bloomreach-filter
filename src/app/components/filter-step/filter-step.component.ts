import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AttributeRuleComponent } from 'src/app/components/attribute-rule/attribute-rule.component';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';
import { AutocompleteDropdownComponent } from 'src/app/shared/components/autocomplete-dropdown/autocomplete-dropdown.component';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
    selector: 'app-filter-step',
    imports: [
        AutocompleteDropdownComponent,
        ReactiveFormsModule,
        AttributeRuleComponent,
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
    addAttributeBtnShowed = signal<boolean>(false);

    selectEvent(option: EventType | Attribute | null): void {
        this.selectedEvent.set(option as EventType);
        if (option && this.filterService.getAttributeRules(this.stepIndex()).length === 0) {
            this.addAttributeBtnShowed.set(true);
        }
    }

    addRules(): void {
        this.filterService.addAttributeRule(this.stepIndex());
        this.addAttributeBtnShowed.set(false);
    }
}

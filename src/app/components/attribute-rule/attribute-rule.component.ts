import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';
import { NumberOperator, NumberOperatorToValueTypeMap } from 'src/app/model/number-operator.enum';
import { StringOperator, StringOperatorToValueTypeMap } from 'src/app/model/string-operator.enum';
import { AutocompleteDropdownComponent } from 'src/app/shared/components/autocomplete-dropdown/autocomplete-dropdown.component';
import { OperatorDropdownComponent } from 'src/app/shared/components/operator-dropdown/operator-dropdown.component';
import { isStringOperator } from 'src/app/shared/helpers';

@Component({
    selector: 'app-attribute-rule',
    imports: [
        AutocompleteDropdownComponent,
        OperatorDropdownComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './attribute-rule.component.html',
    styleUrl: './attribute-rule.component.scss',
})
export class AttributeRuleComponent {
    attributeRuleFormGroup = input.required<FormGroup>();
    eventList = input.required<EventType[] | []>();
    selectedEvent = input<EventType | null>(null);
    onRemove = output<void>();

    attributeDropdownShowed = signal<boolean>(true);
    selectedAttribute = signal<Attribute | null>(null);
    selectedOperator = signal<StringOperator | NumberOperator | null>(null);
    valuesCount = signal<number>(1);
    placeholder = computed((): string => this.determinePlaceholder());

    constructor() {
        effect(() => {
            if (this.selectedOperator()) {
                const valuesCount = isStringOperator(this.selectedOperator()!)
                                    ? StringOperatorToValueTypeMap[this.selectedOperator()! as StringOperator]
                                    : NumberOperatorToValueTypeMap[this.selectedOperator()! as NumberOperator];
                this.valuesCount.set(valuesCount);

                const defaultValue = this.determineValue();
                this.attributeRuleFormGroup().patchValue({
                    value1: defaultValue,
                    value2: defaultValue,
                });
            }
        });
    }

    selectAttribute(option: EventType | Attribute): void {
        this.selectedAttribute.set(option as Attribute);
    }

    selectOperator(operator: StringOperator | NumberOperator | null): void {
        this.selectedOperator.set(operator as (StringOperator | NumberOperator | null));
    }

    remove(): void {
        this.onRemove.emit();
    }

    private determinePlaceholder(): string {
        if (this.selectedOperator() && isStringOperator(this.selectedOperator()!)) {
            return 'Select a value';
        }

        return '';
    }

    private determineValue(): number | null {
        if (this.selectedOperator() && isStringOperator(this.selectedOperator()!)) {
            return null;
        }

        return 0;
    }
}

import { AsyncPipe, NgClass } from '@angular/common';
import { Component, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Attribute } from 'src/app/model/filter';
import { NumberOperator } from 'src/app/model/number-operator.enum';
import { StringOperator } from 'src/app/model/string-operator.enum';
import { AutocompleteService } from 'src/app/shared/components/autocomplete-dropdown/services/autocomplete.service';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import { isStringOperator } from 'src/app/shared/helpers';

@Component({
    selector: 'app-operator-dropdown',
    imports: [
        ClickOutsideDirective,
        ReactiveFormsModule,
        AsyncPipe,
        NgClass,
    ],
    providers: [AutocompleteService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: OperatorDropdownComponent,
            multi: true,
        }],
    templateUrl: './operator-dropdown.component.html',
    styleUrl: './operator-dropdown.component.scss',
})
export class OperatorDropdownComponent implements OnInit, OnDestroy, ControlValueAccessor {
    selectedAttribute = input.required<Attribute | null>();
    selectedAttribute$ = toObservable(this.selectedAttribute);
    onSelectOption = output<StringOperator | NumberOperator | null>();

    selectedOperator$ = new BehaviorSubject<StringOperator | NumberOperator | null>(null);
    activeTab$ = new BehaviorSubject<'string' | 'number'>('string');

    stringTabItems = signal(Object.values(StringOperator));
    numberTabItems = signal(Object.values(NumberOperator));
    dropdownPanelOpened = signal<boolean>(false);
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.selectedAttribute$.pipe(takeUntil(this.destroy$))
            .subscribe((selectedAttribute: Attribute | null) => {
                if (selectedAttribute && !this.selectedOperator$.value) {
                    const possibleOperators = selectedAttribute.type === 'string' ? StringOperator : NumberOperator;
                    const firstOperator = Object.values(possibleOperators)[0];
                    this.emitSelectedOperator(firstOperator);
                }
            });

        this.selectedOperator$.pipe(takeUntil(this.destroy$))
            .subscribe((operator) => {
                if (operator) {
                    const activeTab = isStringOperator(operator!) ? 'string' : 'number';
                    this.activeTab$.next(activeTab);
                }
            });
    }

    private emitSelectedOperator(value: StringOperator | NumberOperator | null): void {
        this.selectedOperator$.next(value);
        this.onSelectOption.emit(value);
        this.onChange(value);
    }

    openDropdown(e: MouseEvent): void {
        e.preventDefault();
        this.markAsTouched();
        if (!this.disabled) {
            this.dropdownPanelOpened.set(true);
        }
    }

    closeDropdown(): void {
        this.dropdownPanelOpened.set(false);
    }

    setActiveTab(tab: 'string' | 'number'): void {
        this.activeTab$.next(tab);
    }

    selectOperator(operator: string): void {
        this.emitSelectedOperator(operator as StringOperator | NumberOperator);
        this.closeDropdown();
    }



    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // ControlValueAccessor methods
    touched = false;
    disabled = false;

    writeValue(value: StringOperator | NumberOperator | null) {
        this.selectedOperator$.next(value);
        this.onSelectOption.emit(value);
    }

    onChange = (value: StringOperator | NumberOperator | null) => {
    };

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    onTouched = () => {
    };

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }
}

import { Component, ElementRef, input, OnDestroy, OnInit, output, viewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-input-search',
    imports: [],
    templateUrl: './input-search.component.html',
    styleUrl: './input-search.component.scss',
})
export class InputSearchComponent implements OnInit, OnDestroy {
    placeholder = input<string>('Filter events...');
    focus = input<boolean>(false);
    onSearch = output<string>();

    inputElement = viewChild<ElementRef>('inputElement');
    searchTerm$: Subject<string> = new Subject<string>();
    destroy$ = new Subject<void>();

    ngOnInit(): void {
        if (this.focus()) {
            this.inputElement()?.nativeElement.focus();
        }

        this.searchTerm$
            .pipe(
                debounceTime(200),
                distinctUntilChanged(),
                takeUntil(this.destroy$),
            ).subscribe((searchTerm: string) => this.onSearch.emit(searchTerm));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

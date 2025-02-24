import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-input-search',
    imports: [],
    templateUrl: './input-search.component.html',
    styleUrl: './input-search.component.scss',
})
export class InputSearchComponent implements OnInit, OnDestroy {
    placeholder = input<string>('Select an event');
    onSearch = output<string>();
    searchTerm$: Subject<string> = new Subject<string>();
    destroy$ = new Subject<void>();

    ngOnInit(): void {
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

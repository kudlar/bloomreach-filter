import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {
    let service: EventsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EventsService, provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(EventsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

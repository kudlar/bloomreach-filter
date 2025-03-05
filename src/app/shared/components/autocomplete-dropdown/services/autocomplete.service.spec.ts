import { AutocompleteService } from './autocomplete.service';
import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';

describe('AutocompleteService', () => {
    let service: AutocompleteService;

    beforeEach(() => {
        service = new AutocompleteService();
    });

    describe('filterOptions', () => {
        it('should call filterEventOptions when no selectedEvent is provided', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [] },
                { type: 'event2', properties: [] },
            ];
            const searchTerm = 'event1';

            // Spy on the private method through the public method
            const filterSpy = jest.spyOn(service as any, 'filterEventOptions');
            service.filterOptions(eventList, null, searchTerm);

            expect(filterSpy).toHaveBeenCalledWith(eventList, searchTerm);
        });

        it('should call filterAttributeOptions when a selectedEvent is provided', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [] },
                { type: 'event2', properties: [] },
            ];
            const selectedEvent: EventType = { type: 'event1', properties: [] };
            const searchTerm = 'property1';

            // Spy on the private method through the public method
            const filterSpy = jest.spyOn(service as any, 'filterAttributeOptions');
            service.filterOptions(eventList, selectedEvent, searchTerm);

            expect(filterSpy).toHaveBeenCalledWith(eventList, selectedEvent, searchTerm);
        });
    });

    describe('filterEventOptions', () => {
        it('should filter events based on the search term', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [] },
                { type: 'event2', properties: [] },
            ];
            const searchTerm = 'event1';

            const filteredEvents = service['filterEventOptions'](eventList, searchTerm);

            expect(filteredEvents.length).toBe(1);
            expect(filteredEvents[0].type).toBe('event1');
        });

        it('should return an empty array when no events match the search term', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [] },
                { type: 'event2', properties: [] },
            ];
            const searchTerm = 'event3';

            const filteredEvents = service['filterEventOptions'](eventList, searchTerm);

            expect(filteredEvents.length).toBe(0);
        });
    });

    describe('filterAttributeOptions', () => {
        it('should filter attributes based on the search term when a selectedEvent is provided', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [{ property: 'prop1', type: 'string' }, { property: 'prop2', type: 'number' }] },
                { type: 'event2', properties: [{ property: 'prop3', type: 'string' }] },
            ];
            const selectedEvent: EventType = { type: 'event1', properties: [] };
            const searchTerm = 'prop1';

            const filteredAttributes = service['filterAttributeOptions'](eventList, selectedEvent, searchTerm);

            expect(filteredAttributes.length).toBe(1);
            expect(filteredAttributes[0].property).toBe('prop1');
        });

        it('should return an empty array when no attributes match the search term', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [{ property: 'prop1', type: 'string' }] },
            ];
            const selectedEvent: EventType = { type: 'event1', properties: [] };
            const searchTerm = 'nonexistent';

            const filteredAttributes = service['filterAttributeOptions'](eventList, selectedEvent, searchTerm);

            expect(filteredAttributes.length).toBe(0);
        });

        it('should return an empty array when the selected event does not exist in the event list', () => {
            const eventList: EventType[] = [
                { type: 'event1', properties: [] },
            ];
            const selectedEvent: EventType = { type: 'event2', properties: [] };
            const searchTerm = 'prop1';

            const filteredAttributes = service['filterAttributeOptions'](eventList, selectedEvent, searchTerm);

            expect(filteredAttributes.length).toBe(0);
        });
    });
});

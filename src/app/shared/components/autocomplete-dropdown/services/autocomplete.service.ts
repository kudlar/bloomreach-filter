import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';

@Injectable()
export class AutocompleteService {

    /**
     * Base filter method for filtering based on search term
     *
     * @param eventList
     * @param selectedEvent
     * @param searchTerm
     */
    filterOptions(eventList: Event[], selectedEvent: Event | null, searchTerm: string): Event[] | Attribute[] {
        searchTerm = searchTerm.toLowerCase();
        if (!selectedEvent) {
            return this.filterEventOptions(eventList, searchTerm);
        } else {
            return this.filterAttributeOptions(eventList, selectedEvent, searchTerm);
        }
    }

    /**
     * Filter event options based on search term
     *
     * @param eventList
     * @param searchTerm
     * @private
     */
    private filterEventOptions(eventList: Event[], searchTerm: string): Event[] {
        return eventList.filter((event: Event) => event.type.toLowerCase().includes(searchTerm));
    }

    /**
     * Filter attribute options based on search term
     *
     * @param eventList
     * @param selectedEvent
     * @param searchTerm
     * @private
     */
    private filterAttributeOptions(eventList: Event[], selectedEvent: Event, searchTerm: string): Attribute[] {
        let event: Event | null = eventList.find((event: Event) => event.type === selectedEvent.type) ?? null;
        if (event) {
            return event.properties.filter((attribute: Attribute) => attribute.property.toLowerCase().includes(searchTerm));
        }

        return [];
    }
}

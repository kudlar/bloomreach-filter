import { Injectable } from '@angular/core';
import { EventType } from 'src/app/model/event-list-response';
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
    filterOptions(eventList: EventType[], selectedEvent: EventType | null, searchTerm: string): EventType[] | Attribute[] {
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
    private filterEventOptions(eventList: EventType[], searchTerm: string): EventType[] {
        return eventList.filter((event: EventType) => event.type.toLowerCase().includes(searchTerm));
    }

    /**
     * Filter attribute options based on search term
     *
     * @param eventList
     * @param selectedEvent
     * @param searchTerm
     * @private
     */
    private filterAttributeOptions(eventList: EventType[], selectedEvent: EventType, searchTerm: string): Attribute[] {
        let event: EventType | null = eventList.find((event: EventType) => event.type === selectedEvent.type) ?? null;
        if (event) {
            return event.properties.filter((attribute: Attribute) => attribute.property.toLowerCase().includes(searchTerm));
        }

        return [];
    }
}

import { 
    convertToLocalTimezone, 
    convertToServerTimezone,
    type LocalTimezone 
} from "./time";

type ExceptionEvent = {
    is_canceled: boolean;
    scheduled_end_time?: string;
    scheduled_start_time?: string;
}

type RawDiscordEvent = {
    name: string;
    entity_metadata: {
        location: string;
    };
    scheduled_start_time: string;
    scheduled_end_time: string;
    recurrence_rule?: {
        by_weekday: number[],
    };
    guild_scheduled_event_exceptions: ExceptionEvent[];
}

export type DiscordEvent = {
    name: string;
    location: string;
    local_start_time: LocalTimezone;
    local_end_time: LocalTimezone;
    server_start_time: string;
    server_end_time: string;
    raw_start_time: string;
    raw_end_time: string;
}

export function sortEventsByDate(events: RawDiscordEvent[]): RawDiscordEvent[] {

    let allEvents: RawDiscordEvent[] = [];

    events.forEach(event => {
        allEvents.push(event);

        if (event.guild_scheduled_event_exceptions.length === 0) return;

        event.guild_scheduled_event_exceptions.forEach(exception => {
            if (exception.is_canceled) return;

            allEvents.push({
                ...event,
                scheduled_start_time: exception.scheduled_start_time ?? event.scheduled_start_time,
                scheduled_end_time: exception.scheduled_end_time ?? event.scheduled_end_time
            });
        });
    });

    allEvents.sort((a, b) => 
        new Date(a.scheduled_start_time).getTime() - new Date(b.scheduled_start_time).getTime()
    );

    return allEvents;
}

export function convertEvents(events: RawDiscordEvent[]): DiscordEvent[] {
    const sortedRawEvents = sortEventsByDate(events);
    const convertedEvents = sortedRawEvents.map(event => _convertToDiscordEvent(event));

    return convertedEvents;
}


function _convertToDiscordEvent(rawEvent: RawDiscordEvent): DiscordEvent {
    return {
        name: rawEvent.name,
        location: rawEvent.entity_metadata.location,
        local_start_time: convertToLocalTimezone(rawEvent.scheduled_start_time),
        local_end_time: convertToLocalTimezone(rawEvent.scheduled_end_time),
        server_start_time: convertToServerTimezone(rawEvent.scheduled_start_time),
        server_end_time: convertToServerTimezone(rawEvent.scheduled_end_time),
        raw_start_time: rawEvent.scheduled_start_time,
        raw_end_time: rawEvent.scheduled_end_time

    }
}
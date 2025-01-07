import { 
    convertToLocalTimezone, 
    convertToServerTimezone,
    type LocalTimezone 
} from "./time";

enum Frequency {
    Yearly = 0,
    Monthly = 1,
    Weekly = 2,
    Daily = 3
}

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
        frequency: Frequency;
        interval: number;
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
    events.sort((a, b) => 
        new Date(a.scheduled_start_time).getTime() - new Date(b.scheduled_start_time).getTime()
    );

    return events;
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
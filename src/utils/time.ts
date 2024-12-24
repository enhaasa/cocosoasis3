export type LocalTimezone = {
    time: string;
    timezone: string;
}

export function convertToLocalTimezone(time?: string): LocalTimezone {
    const date = new Date(time ?? '');
    const formattedTime = date.toLocaleString().replace(',', ' at').slice(0, -3);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        time: formattedTime,
        timezone: userTimezone
    }
}

export function convertToServerTimezone(time?: string): string {
    const date = new Date(time ?? '');
    const gmtTime = date.toUTCString(); 

    return gmtTime;
}
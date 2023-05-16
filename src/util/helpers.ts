export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function timeStringToMinutes(timeString: string): number {
  const parts = timeString.split(':');

  let minutes = Number.parseInt(parts[0]) * 60;

  if (parts.length === 2) {
    minutes += Number.parseInt(parts[1]);
  }

  return minutes;
}

export function timeStringValid(timeString: string): boolean {
  if (!timeString.match(/^\d\d?(:\d\d)?$/)) {
    return false;
  }

  const parts = timeString.split(':');

  const hours = Number.parseInt(parts[0]);

  if (hours < 0 || hours > 24) {
    return false;
  }

  if (parts.length === 2) {
    const minutes = Number.parseInt(parts[1]);

    if (minutes < 0 || minutes > 59) {
      return false;
    }
  }

  return true;
}

export function minutesToTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

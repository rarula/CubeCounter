import { Time } from './types';

export function mod(n: number, d: number) {
    return ((n % d) + d) % d;
}

export function toRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
}

export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

export function getTimeByMilliseconds(ms: number): Time {
    const milliseconds = ms % 1000;

    const sec = (ms - milliseconds) / 1000;
    const seconds = sec % 60;

    const min = (sec - seconds) / 60;
    const minutes = min % 60;

    const hours = (min - minutes) / 60;
    return { milliseconds, seconds, minutes, hours };
}

export function toSecondsString(value: number): string {
    return value.toString().padStart(2, '0');
}

export function toMillisecondsString(value: number): string {
    return value.toString().padEnd(3, '0');
}

export function toTimeString(ms: number): string {
    const time = getTimeByMilliseconds(ms);

    if (0 < time.hours) {
        return '59:59.999+';
    } else {
        return `${toSecondsString(time.minutes)}:${toSecondsString(time.seconds)}.${toMillisecondsString(time.milliseconds)}`;
    }
}

export function toDateString(ms: number, spacing = true): string {
    const date = new Date(ms);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    // prettier-ignore
    return [
        y,
        m.toString().padStart(2, '0'),
        d.toString().padStart(2, '0')
    ].join(spacing ? ' / ' : '/');
}

export class Random {
    private w: number;
    private x = 154866524;
    private y = 571192764;
    private z = 764267100;

    constructor(seed: number) {
        this.w = seed;
    }

    public next() {
        const t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8));
        return this.w;
    }
}

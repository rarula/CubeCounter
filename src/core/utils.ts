export function mod(n: number, d: number) {
    return ((n % d) + d) % d;
}

export function degToRad(degrees: number) {
    return (degrees * Math.PI) / 180;
}

export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
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

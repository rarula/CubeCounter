export type Question = {
    image: string;
    answer: number;
    choices: number[];
};

export type Coordinates = {
    x: number;
    y: number;
    z: number;
};

export type Size = {
    width: number;
    height: number;
    depth: number;
};

export type Time = {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
};

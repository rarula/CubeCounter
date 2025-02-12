export type Question = {
    image: string;
    answer: number;
    choices: number[];
};

export type Stats = {
    finishedTime: number;
    wrongAnswer: number;
};

export type FormattedStats = {
    time: string;
    wrongAnswer: number;
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

export type Calendar = {
    year: number;
    month: number;
    date: number;
    day: number;
    isThisMonth: boolean;
}[];

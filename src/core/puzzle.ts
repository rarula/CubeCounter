import { createCanvas } from './canvas';
import { Coordinates, Size, Question } from './types';
import { Random } from './utils';

const ZOOM = 0.8;

export class Puzzle {
    private random: Random;
    private min: Size;
    private max: Size;

    constructor(random: Random, size: { min: Size; max: Size }) {
        this.random = random;
        this.min = size.min;
        this.max = size.max;
    }

    public next(): Question {
        const size = this.nextSize();
        const question = this.nextQuestion(size);

        return question;
    }

    private nextSize(): Size {
        const wd = this.max.width - this.min.width;
        const width = (Math.abs(this.random.next()) % (wd + 1)) + this.min.width;

        const hd = this.max.height - this.min.height;
        const height = (Math.abs(this.random.next()) % (hd + 1)) + this.min.height;

        const dd = this.max.depth - this.min.depth;
        const depth = (Math.abs(this.random.next()) % (dd + 1)) + this.min.depth;

        return { width, height, depth };
    }

    private nextQuestion(size: Size): Question {
        const total = size.width * size.height * size.depth;
        const empty = total - (size.width + size.height + size.depth - 2);
        const count = Math.abs(this.random.next()) % (empty + 1);

        const heightsList: number[][] = [[size.height, ...Array<number>(size.depth - 1).fill(1)]];
        let placeableList: Coordinates[] = [];

        for (let x = 0; x < size.width - 1; x++) {
            heightsList.push([1, ...Array<number>(size.depth - 1).fill(0)]);
        }

        const updatePlaceableCoords = (): void => {
            placeableList = [];

            for (let x = 0; x < size.width; x++) {
                for (let z = 0; z < size.depth; z++) {
                    let isPlaceableX = false;
                    let isPlaceableZ = false;
                    const current = heightsList[x][z];

                    // X Axis
                    if (0 < x) {
                        const top = heightsList[x - 1][z];

                        if (0 < top && current < top) {
                            isPlaceableX = true;
                        }
                    }

                    // Z Axis
                    if (0 < z) {
                        const left = heightsList[x][z - 1];

                        if (0 < left && current < left) {
                            isPlaceableZ = true;
                        }
                    }

                    if ((0 < x && z == 0 && isPlaceableX) || (0 < z && x == 0 && isPlaceableZ) || (0 < x && 0 < z && isPlaceableX && isPlaceableZ)) {
                        placeableList.push({ x, y: current + 1, z });
                    }
                }
            }
        };

        for (let i = 0; i < count; i++) {
            updatePlaceableCoords();

            const index = Math.abs(this.random.next()) % placeableList.length;
            const coords = placeableList[index];
            heightsList[coords.x][coords.z]++;
        }

        const image = createCanvas(heightsList, ZOOM).toDataURL();

        // TODO: マジックナンバーで選択肢の数を決めるのをやめて変数化する
        const answer = total - empty + count;
        const offset = answer - (Math.abs(this.random.next()) % 6);
        const choices = [0, 1, 2, 3, 4, 5].map((val) => val + offset);

        return { image, answer, choices };
    }
}

import { createContext, ReactNode, useContext, useState } from 'react';

import { Puzzle } from '../core/puzzle';

type Props = {
    puzzle: Puzzle;
    children: ReactNode;
};

type ContextGameProgress = {
    puzzle: Puzzle;
    question: number;
    setQuestion: (value: number | ((prevState: number) => number)) => void;
};

const GameProgress = createContext<ContextGameProgress | undefined>(undefined);

export const useGameProgress = (): ContextGameProgress => {
    const context = useContext(GameProgress);

    if (context === undefined) {
        throw new Error('Cannot use GameProgress outside of provider.');
    } else {
        return context;
    }
};

const GameProgressProvider = (props: Props): JSX.Element => {
    const [question, setQuestion] = useState(0);

    const value: ContextGameProgress = {
        puzzle: props.puzzle,
        question,
        setQuestion,
    };

    return <GameProgress.Provider value={value}>{props.children}</GameProgress.Provider>;
};

export default GameProgressProvider;

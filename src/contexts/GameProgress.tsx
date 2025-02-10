import { createContext, ReactNode, useContext, useState } from 'react';

import { Question } from '../core/types';

type Props = {
    questions: Question[];
    children: ReactNode;
};

type Session = 'READY' | 'PLAYING' | 'FINISHED';

type ContextGameProgress = {
    questions: Question[];
    startedTime: number;
    setStartedTime: (value: number | ((prevState: number) => number)) => void;
    questionIndex: number;
    setQuestionIndex: (value: number | ((prevState: number) => number)) => void;
    wrongAnswers: number;
    setWrongAnswers: (value: number | ((prevState: number) => number)) => void;
    session: Session;
    setSession: (value: Session | ((prevState: Session) => Session)) => void;
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
    const [startedTime, setStartedTime] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [session, setSession] = useState<Session>('READY');

    const value: ContextGameProgress = {
        questions: props.questions,
        startedTime,
        setStartedTime,
        questionIndex,
        setQuestionIndex,
        wrongAnswers,
        setWrongAnswers,
        session,
        setSession,
    };

    return <GameProgress.Provider value={value}>{props.children}</GameProgress.Provider>;
};

export default GameProgressProvider;

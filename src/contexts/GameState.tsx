import { createContext, ReactNode, useContext, useState } from 'react';

type Props = {
    children: ReactNode;
};

type ContextGameState = {
    date: number;
    changeDate: (date: number) => void;
    isPlaying: boolean;
    setPlaying: (isPlaying: boolean) => void;
};

const GameState = createContext<ContextGameState>({
    date: 0,
    changeDate: () => {},
    isPlaying: false,
    setPlaying: () => {},
});

export const useGameState = (): ContextGameState => {
    return useContext(GameState);
};

const GameStateProvider = (props: Props): JSX.Element => {
    const time = new Date(new Date().toDateString());
    const [date, changeDate] = useState(time.getTime());
    const [isPlaying, setPlaying] = useState(false);

    const value: ContextGameState = {
        date,
        changeDate,
        isPlaying,
        setPlaying,
    };

    return <GameState.Provider value={value}>{props.children}</GameState.Provider>;
};

export default GameStateProvider;

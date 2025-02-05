import Panel from './Panel';
import Screen from './Screen';
import GameProgressProvider, { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { Puzzle } from '../core/puzzle';
import { Random } from '../core/utils';

const WrappedGame = (): JSX.Element => {
    const progress = useGameProgress();
    const question = progress.puzzle.next();

    return (
        <div className='game'>
            <Screen question={question} />
            <Panel question={question} />
        </div>
    );
};

const Game = (): JSX.Element => {
    const state = useGameState();

    const random = new Random(state.date);
    const puzzle = new Puzzle(random, { min: { width: 3, height: 3, depth: 3 }, max: { width: 4, height: 4, depth: 4 } });

    return (
        <GameProgressProvider puzzle={puzzle}>
            <WrappedGame />
        </GameProgressProvider>
    );
};

export default Game;

import { useEffect, useState } from 'react';

import Fade from './Fade';
import Panel from './Panel';
import Screen from './Screen';
import Spin from './Spin';
import GameProgressProvider, { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { Puzzle } from '../core/puzzle';
import { Question } from '../core/types';
import { Random } from '../core/utils';

const WrappedGame = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();
    const question = progress.questions[progress.questionIndex];

    return (
        <>
            {(progress.session === 'READY' || progress.session === 'PLAYING') && (
                <div>
                    <div className='button' onClick={() => progress.setSession('PLAYING')}>
                        START
                    </div>
                </div>
            )}
            <Fade duration='0.2s' in={progress.session === 'PLAYING'}>
                <div className='session-playing'>
                    <Screen question={question} />
                    <Panel question={question} />
                </div>
            </Fade>
            {progress.session === 'FINISHED' && (
                <div>
                    <h1>Finished!</h1>
                    <div className='button' onClick={() => state.setPlaying(false)}>
                        OK
                    </div>
                </div>
            )}
        </>
    );
};

const Game = (): JSX.Element => {
    const state = useGameState();

    const random = new Random(state.date);
    const puzzle = new Puzzle(random, { min: { width: 3, height: 3, depth: 3 }, max: { width: 4, height: 4, depth: 4 } });

    const [questions, setQuestions] = useState<Question[] | undefined>(undefined);

    useEffect(() => {
        // 'setTimeout(callback, delay)' を用いることで、メインスレッドの処理を完了してから実行している
        // 遅延を0msにして実行するとSafariで表示が崩れるのを確認したため、100msにして実行している
        setTimeout(() => {
            // TODO: マジックナンバーで問題数を決めるのをやめて変数化する
            const questions: Question[] = [];
            for (let i = 0; i < 5; i++) {
                questions.push(puzzle.next());
            }

            setQuestions(questions);
        }, 100);
    }, []);

    return (
        <div className='game'>
            {questions === undefined ? (
                <Spin />
            ) : (
                <GameProgressProvider questions={questions}>
                    <WrappedGame />
                </GameProgressProvider>
            )}
        </div>
    );
};

export default Game;

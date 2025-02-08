import { useEffect, useState } from 'react';

import Panel from './Panel';
import Screen from './Screen';
import GameProgressProvider, { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { Puzzle } from '../core/puzzle';
import { Question } from '../core/types';
import { Random } from '../core/utils';

const WrappedGame = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    switch (progress.session) {
        case 'READY': {
            return (
                <div className='button' onClick={() => progress.setSession('PLAYING')}>
                    START
                </div>
            );
        }
        case 'PLAYING': {
            const question = progress.questions[progress.questionIndex];
            return (
                <div className='game'>
                    <Screen question={question} />
                    <Panel question={question} />
                </div>
            );
        }
        case 'FINISHED': {
            return (
                <div>
                    <h1>Finished!</h1>
                    <div className='button' onClick={() => state.setPlaying(false)}>
                        OK
                    </div>
                </div>
            );
        }
    }
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

    return questions === undefined ? (
        <h1>Loading...</h1>
    ) : (
        <GameProgressProvider questions={questions}>
            <WrappedGame />
        </GameProgressProvider>
    );
};

export default Game;

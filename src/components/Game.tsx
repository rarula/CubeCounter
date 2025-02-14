import { useEffect, useState } from 'react';

import Fade from './Fade';
import Panel from './Panel';
import Result from './Result';
import Spin from './Spin';
import GameProgressProvider, { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { Puzzle } from '../core/puzzle';
import { Question } from '../core/types';
import { Random, toDateString } from '../core/utils';

const QUESTION_COUNT = 5;

const WrappedGame = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    const dateStr = toDateString(state.date);
    const question = progress.questions[progress.questionIndex];

    const clickStartButton = (): void => {
        progress.setSession('PLAYING');
        progress.setStartedTime(new Date().getTime());
    };

    const clickBackButton = (): void => {
        state.setPlaying(false);
    };

    return (
        <>
            {(progress.session === 'READY' || progress.session === 'PLAYING') && (
                <div className='menu'>
                    <h3>{dateStr}</h3>
                    <div className='menu-panel'>
                        <div className='button' onClick={clickStartButton}>
                            START
                        </div>
                        <div className='button' onClick={clickBackButton}>
                            BACK
                        </div>
                    </div>
                </div>
            )}
            <Fade duration='0.2s' in={progress.session === 'PLAYING'}>
                <div className='game'>
                    <div className='screen'>
                        <img className='screen-img' src={question.image} />
                    </div>
                    <div className='interface'>
                        <Panel question={question} />
                        <div className='information'>
                            <span className='color-gray font-larger'>{`${progress.questionIndex + 1} / ${progress.questions.length}`}</span>
                        </div>
                    </div>
                </div>
            </Fade>
            {progress.session === 'FINISHED' && <Result />}
        </>
    );
};

const Game = (): JSX.Element => {
    const state = useGameState();

    const random = new Random(state.date);
    const puzzle = new Puzzle(random, { min: { width: 3, height: 2, depth: 3 }, max: { width: 4, height: 5, depth: 4 } });

    const [questions, setQuestions] = useState<Question[] | undefined>(undefined);

    useEffect(() => {
        // 'setTimeout(callback, delay)' を用いることで、メインスレッドの処理を完了してから実行している
        // 遅延を0msにして実行するとSafariで表示が崩れるのを確認したため、100msにして実行している
        setTimeout(() => {
            const questions: Question[] = [];
            for (let i = 0; i < QUESTION_COUNT; i++) {
                questions.push(puzzle.next());
            }

            setQuestions(questions);
        }, 100);
    }, []);

    return questions === undefined ? (
        <div className='loading'>
            <Spin />
        </div>
    ) : (
        <GameProgressProvider questions={questions}>
            <WrappedGame />
        </GameProgressProvider>
    );
};

export default Game;

import { useEffect, useState } from 'react';

import Fade from './Fade';
import Panel from './Panel';
import Screen from './Screen';
import Spin from './Spin';
import GameProgressProvider, { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { Puzzle } from '../core/puzzle';
import { Question } from '../core/types';
import { getTimeByMilliseconds, msToTimeString, Random, toTimeString } from '../core/utils';

const ResultMenu = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    const elapsed = new Date().getTime() - progress.startedTime;
    const { milliseconds, seconds, minutes, hours } = getTimeByMilliseconds(elapsed);

    return (
        <div className='menu'>
            <h1>終了！</h1>
            <div className='submenu'>
                <h3>
                    <span className='font-normal color-gray'>間違えた回数: </span>
                    <span className='font-bold'>{progress.wrongAnswers}</span>
                </h3>
                <h3>
                    <span className='font-normal color-gray'>記録: </span>
                    {0 < hours ? (
                        <span className='font-bold'>
                            {toTimeString(59)}:{toTimeString(59)}.{msToTimeString(999)}+
                        </span>
                    ) : (
                        <span className='font-bold'>
                            {toTimeString(minutes)}:{toTimeString(seconds)}.{msToTimeString(milliseconds)}
                        </span>
                    )}
                </h3>
            </div>
            <div className='button' onClick={() => state.setPlaying(false)}>
                OK
            </div>
        </div>
    );
};

const WrappedGame = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    const date = new Date(state.date);
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
                    <h3>
                        {date.getFullYear()}/ {toTimeString(date.getMonth() + 1)} / {toTimeString(date.getDate())}
                    </h3>
                    <div className='menu-panel'>
                        <div className='button' onClick={clickStartButton}>
                            START
                        </div>
                        <div className='button' onClick={clickBackButton}>
                            Back
                        </div>
                    </div>
                </div>
            )}
            <Fade duration='0.2s' in={progress.session === 'PLAYING'}>
                <div className='session-playing'>
                    <Screen question={question} />
                    <Panel question={question} />
                </div>
            </Fade>
            {progress.session === 'FINISHED' && <ResultMenu />}
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

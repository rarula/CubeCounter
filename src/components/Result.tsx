import { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { getTimeByMilliseconds, msToTimeString, toTimeString } from '../core/utils';

const Result = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    const elapsed = new Date().getTime() - progress.startedTime;
    const { milliseconds, seconds, minutes, hours } = getTimeByMilliseconds(elapsed);

    return (
        <div className='result'>
            <div className='menu'>
                <h1>終了！</h1>
                <div className='menu-sub'>
                    <h3>
                        <span className='font-normal color-gray'>間違えた回数: </span>
                        <span className='font-bold'>{progress.wrongAnswers}</span>
                    </h3>
                    <h3>
                        <span className='font-normal color-gray'>記録: </span>
                        {0 < hours ? (
                            <span className='font-bold'>{`${toTimeString(59)}:${toTimeString(59)}.${msToTimeString(999)}+`}</span>
                        ) : (
                            <span className='font-bold'>{`${toTimeString(minutes)}:${toTimeString(seconds)}.${msToTimeString(milliseconds)}`}</span>
                        )}
                    </h3>
                </div>
                <div className='button' onClick={() => state.setPlaying(false)}>
                    OK
                </div>
                <div className='result-questions'>
                    {progress.questions.map((question, index) => (
                        <div className='question' key={index}>
                            <div className='question-number'>
                                <span className='font-larger'>{index + 1}</span>
                            </div>
                            <img className='question-img' src={question.image} />
                            <div className='question-details'>
                                <div className='answer'>
                                    <span className='font-x-large'>{`${question.answer}個`}</span>
                                </div>
                                <div className='stats'>
                                    <p>
                                        <span>2ミス</span>
                                    </p>
                                    <p>
                                        <span>00:15.000</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Result;

import { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { getTimeByMilliseconds, msToTimeString, toTimeString } from '../core/utils';

const Result = (): JSX.Element => {
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

export default Result;

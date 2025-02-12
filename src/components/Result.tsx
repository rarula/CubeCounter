import { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { FormattedStats, Stats } from '../core/types';
import { getTimeByMilliseconds, msToTimeString, toTimeString } from '../core/utils';

const Result = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    const formatStatsList = (statsList: Stats[], initialStats: Stats): FormattedStats[] => {
        const result: FormattedStats[] = [];
        const list = [initialStats, ...statsList];

        for (let i = 1; i < list.length; i++) {
            const elapsed = list[i].finishedTime - list[i - 1].finishedTime;
            const time = getTimeByMilliseconds(elapsed);

            result.push({
                time: `${toTimeString(time.minutes)}:${toTimeString(time.seconds)}.${msToTimeString(time.milliseconds)}`,
                wrongAnswer: list[i].wrongAnswer,
            });
        }

        return result;
    };

    const elapsed = progress.statsList[progress.statsList.length - 1].finishedTime - progress.startedTime;
    const time = getTimeByMilliseconds(elapsed);

    const wrongAnswerCount = progress.statsList.reduce((prev, current) => {
        return prev + current.wrongAnswer;
    }, 0);

    const statsList = formatStatsList(progress.statsList, {
        finishedTime: progress.startedTime,
        wrongAnswer: 0,
    });

    return (
        <div className='result'>
            <div className='menu'>
                <h1>終了！</h1>
                <div className='menu-sub'>
                    <h3>
                        <span className='font-normal color-gray'>間違えた回数: </span>
                        <span className='font-bold'>{wrongAnswerCount}</span>
                    </h3>
                    <h3>
                        <span className='font-normal color-gray'>記録: </span>
                        {0 < time.hours ? (
                            <span className='font-bold'>{`${toTimeString(59)}:${toTimeString(59)}.${msToTimeString(999)}+`}</span>
                        ) : (
                            <span className='font-bold'>{`${toTimeString(time.minutes)}:${toTimeString(time.seconds)}.${msToTimeString(time.milliseconds)}`}</span>
                        )}
                    </h3>
                </div>
                <div className='button' onClick={() => state.setPlaying(false)}>
                    OK
                </div>
                <div className='result-questions'>
                    {progress.questions.map((question, index) => (
                        <div className={'question' + (0 < statsList[index].wrongAnswer ? ' miss' : '')} key={index}>
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
                                        <span>{`${statsList[index].wrongAnswer}ミス`}</span>
                                    </p>
                                    <p>
                                        <span>{statsList[index].time}</span>
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

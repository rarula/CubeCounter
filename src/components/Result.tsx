import { LineSvg, TwitterSvg } from './Svg';
import { useGameProgress } from '../contexts/GameProgress';
import { useGameState } from '../contexts/GameState';
import { FormattedStats, Stats } from '../core/types';
import { toDateString, toTimeString } from '../core/utils';

// prettier-ignore
const SHARE_TWITTER_TEXT = [
    '%DATE% - 記録は %TIME% でした！',
    '#かぞえてブロック',
    'https://rarula.github.io/CubeCounter/',
].join('\n');

const SHARE_LINE_TEXT = '%DATE% - 記録は %TIME% でした！';

const Result = (): JSX.Element => {
    const state = useGameState();
    const progress = useGameProgress();

    const formatStatsList = (statsList: Stats[], initialStats: Stats): FormattedStats[] => {
        const result: FormattedStats[] = [];
        const list = [initialStats, ...statsList];

        for (let i = 1; i < list.length; i++) {
            const elapsed = list[i].finishedTime - list[i - 1].finishedTime;
            const time = toTimeString(elapsed);

            result.push({
                time,
                wrongAnswer: list[i].wrongAnswer,
            });
        }

        return result;
    };

    const wrongAnswerCount = progress.statsList.reduce((prev, current) => {
        return prev + current.wrongAnswer;
    }, 0);

    const finished = progress.statsList[progress.statsList.length - 1].finishedTime;
    const elapsed = finished - progress.startedTime;

    const dateStr = toDateString(state.date, false);
    const timeStr = toTimeString(elapsed);

    // prettier-ignore
    const twitterText = SHARE_TWITTER_TEXT
        .replace('%DATE%', dateStr)
        .replace('%TIME%', timeStr);

    // prettier-ignore
    const lineText = SHARE_LINE_TEXT
        .replace('%DATE%', dateStr)
        .replace('%TIME%', timeStr);

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
                        <span className='font-bold'>{timeStr}</span>
                    </h3>
                </div>
                <div className='button' onClick={() => state.setPlaying(false)}>
                    OK
                </div>
                <div className='share'>
                    <a className='share-button' href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`} target='_blank' rel='noreferrer'>
                        <TwitterSvg />
                    </a>
                    <a
                        className='share-button'
                        href={`https://social-plugins.line.me/lineit/share?url=https://rarula.github.io/CubeCounter/&text=${encodeURIComponent(lineText)}`}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <LineSvg />
                    </a>
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

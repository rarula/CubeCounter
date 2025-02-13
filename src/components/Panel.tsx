import { useState } from 'react';

import { useGameProgress } from '../contexts/GameProgress';
import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Panel = (props: Props): JSX.Element => {
    const progress = useGameProgress();

    const [isCooling, setCooling] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState(0);

    const nextQuestion = (): void => {
        progress.statsList.push({
            finishedTime: new Date().getTime(),
            wrongAnswer: wrongAnswer,
        });
        setWrongAnswer(0);

        if (progress.questionIndex + 1 < progress.questions.length) {
            progress.setQuestionIndex((prev) => prev + 1);
        } else {
            progress.setSession('FINISHED');
        }
    };

    const clickWrongAnswer = (): void => {
        setCooling(true);
        setWrongAnswer((prev) => prev + 1);

        setTimeout(() => {
            setCooling(false);
        }, 2500);
    };

    return (
        <div className='panel-container'>
            {isCooling && (
                <div className='cooling-icon-container'>
                    <div className='cooling-icon' />
                </div>
            )}
            <ul className='panel'>
                {props.question.choices.map((choice) =>
                    isCooling ? (
                        choice === props.question.answer ? (
                            <li key={choice} className='choice correct-answer cooling'>
                                {choice}
                            </li>
                        ) : (
                            <li key={choice} className='choice wrong-answer cooling'>
                                {choice}
                            </li>
                        )
                    ) : choice === props.question.answer ? (
                        <li key={choice} className='choice correct-answer' onClick={nextQuestion}>
                            {choice}
                        </li>
                    ) : (
                        <li key={choice} className='choice wrong-answer' onClick={clickWrongAnswer}>
                            {choice}
                        </li>
                    ),
                )}
            </ul>
            <div className='information'>
                <span className='color-gray font-larger'>{`${progress.questionIndex + 1} / ${progress.questions.length}`}</span>
            </div>
        </div>
    );
};

export default Panel;

import { useState } from 'react';

import { useGameProgress } from '../contexts/GameProgress';
import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Panel = (props: Props): JSX.Element => {
    const progress = useGameProgress();

    const [isCooling, setCooling] = useState(false);

    const nextQuestion = (): void => {
        if (progress.questionIndex + 1 < progress.questions.length) {
            progress.setQuestionIndex((prev) => prev + 1);
        } else {
            progress.setSession('FINISHED');
        }
    };

    const clickWrongAnswer = (): void => {
        setCooling(true);
        progress.setWrongAnswers((prev) => prev + 1);

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
        </div>
    );
};

export default Panel;

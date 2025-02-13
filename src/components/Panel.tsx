import { useEffect, useState } from 'react';

import { useGameProgress } from '../contexts/GameProgress';
import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Panel = (props: Props): JSX.Element => {
    const progress = useGameProgress();

    const [isCooling, setCooling] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [wrongIndexes, setWrongIndexes] = useState(new Set<number>());

    useEffect(() => {
        setWrongIndexes(new Set<number>());
    }, [props.question]);

    const clickCorrectAnswer = (): void => {
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

    const clickWrongAnswer = (index: number): void => {
        setCooling(true);
        setWrongAnswer((prev) => prev + 1);
        wrongIndexes.add(index);

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
                {props.question.choices.map((choice, index) =>
                    wrongIndexes.has(index) ? (
                        <li key={index} className='choice wrong-answer cooling'>
                            <span>{choice}</span>
                        </li>
                    ) : isCooling ? (
                        <li key={index} className='choice cooling'>
                            <span>{choice}</span>
                        </li>
                    ) : choice === props.question.answer ? (
                        <li key={index} className='choice' onClick={clickCorrectAnswer}>
                            <span>{choice}</span>
                        </li>
                    ) : (
                        <li key={index} className='choice' onClick={() => clickWrongAnswer(index)}>
                            <span>{choice}</span>
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
};

export default Panel;

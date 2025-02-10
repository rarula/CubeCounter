import { useGameProgress } from '../contexts/GameProgress';
import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Panel = (props: Props): JSX.Element => {
    const progress = useGameProgress();

    const nextQuestion = (): void => {
        if (progress.questionIndex + 1 < progress.questions.length) {
            progress.setQuestionIndex((prev) => prev + 1);
        } else {
            progress.setSession('FINISHED');
        }
    };

    const clickWrongAnswer = (): void => {
        progress.setWrongAnswers((prev) => prev + 1);
    };

    return (
        <ul className='panel'>
            {props.question.choices.map((choice) =>
                choice === props.question.answer ? (
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
    );
};

export default Panel;

import { useGameProgress } from '../contexts/GameProgress';
import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Panel = (props: Props): JSX.Element => {
    const progress = useGameProgress();
    const increment = (): void => {
        progress.setQuestion((prev) => prev + 1);
    };

    return (
        <ul className='panel'>
            {props.question.choices.map((choice) =>
                choice === props.question.answer ? (
                    <li key={choice} className='choice correct-answer' onClick={increment}>
                        {choice}
                    </li>
                ) : (
                    <li key={choice} className='choice wrong-answer'>
                        {choice}
                    </li>
                ),
            )}
        </ul>
    );
};

export default Panel;

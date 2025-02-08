import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Screen = (props: Props): JSX.Element => {
    return (
        <div className='screen'>
            <img className='screen-img' src={props.question.image} />
        </div>
    );
};

export default Screen;

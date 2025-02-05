import { createCanvas } from '../core/canvas';
import { Question } from '../core/types';

type Props = {
    question: Question;
};

const Screen = (props: Props): JSX.Element => {
    const canvas = createCanvas(props.question, 0.8);

    return (
        <div className='screen'>
            <img className='screen-img' src={canvas.toDataURL()} />
        </div>
    );
};

export default Screen;

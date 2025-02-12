import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    in: boolean;
    duration: string;
};

const Fade = (props: Props): JSX.Element => {
    return (
        <div className={'fade' + (props.in ? ' showing' : '')} style={{ '--fade-duration': props.duration }}>
            {props.children}
        </div>
    );
};

export default Fade;

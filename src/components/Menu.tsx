import { useState } from 'react';

import CalendarModal from './CalendarModal';
import Fade from './Fade';
import { CalendarSvg } from './Svg';
import { useGameState } from '../contexts/GameState';
import { toTimeString } from '../core/utils';

const Menu = (): JSX.Element => {
    const state = useGameState();
    const date = new Date(state.date);

    const [isOpened, setOpened] = useState(false);

    const openCalendar = (): void => {
        setOpened(true);
    };

    const closeCalendar = (): void => {
        setOpened(false);
    };

    const handleClick = (): void => {
        state.setPlaying(true);
    };

    return (
        <>
            <div className='menu'>
                <h1>かぞえてブロック</h1>
                <h3>{`${date.getFullYear()} / ${toTimeString(date.getMonth() + 1)} / ${toTimeString(date.getDate())}`}</h3>
                <div className='menu-panel'>
                    <div className='relative'>
                        <div className='icon-button calendar-button' onClick={openCalendar}>
                            <CalendarSvg />
                        </div>
                        <div className='button' onClick={handleClick}>
                            PLAY
                        </div>
                    </div>
                    <div className='button'>HOW TO PLAY</div>
                </div>
            </div>
            <Fade duration='0.2s' in={isOpened}>
                <CalendarModal closeCalendar={closeCalendar} isOpened={isOpened} />
            </Fade>
        </>
    );
};

export default Menu;
